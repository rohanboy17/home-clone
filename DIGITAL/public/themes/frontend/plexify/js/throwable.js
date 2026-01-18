"use strict";

const restArguments = function (func, startIndex) {
    startIndex = startIndex == null ? func.length - 1 : +startIndex;
    return function () {
        let length = Math.max(arguments.length - startIndex, 0),
            rest = Array(length), i;
        for (i = 0; i < length; i++) {
            rest[i] = arguments[i + startIndex];
        }
        switch (startIndex) {
            case 0:
                return func.call(this, rest);
            case 1:
                return func.call(this, arguments[0], rest);
            case 2:
                return func.call(this, arguments[0], arguments[1], rest);
        }
        let args = Array(startIndex + 1);
        for (i = 0; i < startIndex; i++) args[i] = arguments[i];
        args[startIndex] = rest;
        return func.apply(this, args);
    };
};

const tpDelay = restArguments(function (func, wait, args) {
    return setTimeout(() => func.apply(null, args), wait);
});

window.tpDebounce = function (func, wait, immediate) {
    let timeout, result;

    const later = (context, args) => {
        timeout = null;
        if (args) result = func.apply(context, args);
    };

    const debounced = restArguments(function (args) {
        if (timeout) clearTimeout(timeout);
        if (immediate) {
            let callNow = !timeout;
            timeout = setTimeout(later, wait);
            if (callNow) result = func.apply(this, args);
        } else {
            timeout = tpDelay(later, wait, this, args);
        }
        return result;
    });

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = null;
    };

    return debounced;
};

const PLUGIN_NAME = "tThrowable";
const defaults = {
    roundness: "sharp",
    scrollGravity: false
};

const pluginStore = new WeakMap();

class ThrowableScene {
    constructor(element, options) {
        this._name = PLUGIN_NAME;
        this.options = { ...defaults, ...options };

        this.DOM = {};
        this.DOM.element = element;
        this.DOM.throwables = element.querySelectorAll("[data-t-throwable-el]");

        this.onWindowResize = tpDebounce(this.onWindowResize.bind(this), 250);

        this.bodies = [];
        this.init();
    }

    init() {
        this.createWorld();
        this.createBoundries();
        this.createBodies();
        this.enableRunner();
        this.makeItRain();
        this.bindResize();
    }

    enableRunner() {
        new IntersectionObserver(([entry]) => {
            this.runner.enabled = entry.isIntersecting;
        }).observe(this.DOM.element);
    }

    makeItRain() {
        new IntersectionObserver(([entry], obs) => {
            if (entry.isIntersecting) {
                this.DOM.throwables.forEach(el => {
                    gsap.to(el, { opacity: 1, duration: 0.35 });
                });
                this.startRain();
                obs.disconnect();
            }
        }).observe(this.DOM.element);
    }

    bindResize() {
        window.addEventListener("resize", this.onWindowResize);
    }

    createWorld() {
        this.height = this.DOM.element.offsetHeight;
        this.width = this.DOM.element.offsetWidth;

        this.engine = Matter.Engine.create();
        this.runner = Matter.Runner.create();

        this.mouse = Matter.Mouse.create(this.DOM.element);

        this.DOM.element.removeEventListener("mousewheel", this.mouse.mousewheel);
        this.DOM.element.addEventListener("mouseleave", this.mouse.mouseup);

        this.mouseConstraint = Matter.MouseConstraint.create(this.engine, {
            mouse: this.mouse,
            constraint: {
                render: { visible: false }
            }
        });

        this.engine.gravity.y = 0.8;

        Matter.Composite.add(this.engine.world, [this.mouseConstraint]);
        Matter.Runner.start(this.runner, this.engine);

        Matter.Events.on(this.mouseConstraint, "mousedown", () => {
            this.DOM.element.style.pointerEvents = "auto";
        });

        Matter.Events.on(this.mouseConstraint, "mouseup", () => {
            this.DOM.element.style.pointerEvents = "";
        });

        this.runner.enabled = false;
    }

    createBoundries() {
        this.boundStart = Matter.Bodies.rectangle(-250, this.height / 2, 500, 4 * this.height, { isStatic: true });
        this.boundEnd = Matter.Bodies.rectangle(this.width + 250, this.height / 2, 500, 4 * this.height, { isStatic: true });
        this.boundBottom = Matter.Bodies.rectangle(0, this.height + 250, 2 * this.width, 500, { isStatic: true });

        Matter.Composite.add(this.engine.world, [
            this.boundBottom,
            this.boundStart,
            this.boundEnd,
        ]);
    }

    createBodies() {
        this.DOM.throwables.forEach((el, i) => {
            const span = el.querySelector("span");
            const rect = el.getBoundingClientRect();

            const setX = gsap.quickSetter(el, "x", "px");
            const setY = gsap.quickSetter(el, "y", "px");

            const angle = gsap.utils.random(-0.2 * Math.PI, 0.2 * Math.PI);
            const x = gsap.utils.random(rect.width / 2, this.width - rect.width / 2);
            const y = -rect.width - (i * rect.height + 10);

            const radius = this.options.roundness === "sharp" ? 0 : rect.height / 2;

            const body = Matter.Bodies.rectangle(x, y, rect.width, rect.height, {
                chamfer: { radius },
                angle,
                isStatic: true,
                restitution: 0.3
            });

            this.bodies.push(body);
            Matter.Composite.add(this.engine.world, [body]);

            Matter.Events.on(this.runner, "tick", () => {
                if (this.runner.enabled) {
                    span.style.transform = `translate(-50%, -50%) rotate(${body.angle.toFixed(2)}rad)`;
                    setY(body.position.y.toFixed(1));
                    setX(body.position.x.toFixed(1));
                }
            });
        });
    }

    startRain() {
        this.bodies.forEach((body, i) => {
            setTimeout(() => {
                Matter.Body.setStatic(body, false);
            }, 80 * i);
        });

        let createdTop = false;

        Matter.Events.on(this.runner, "tick", () => {
            if (!createdTop && this.bodies[this.bodies.length - 1].position.y > this.height / 2) {
                this.createTopBound();
                if (this.options.scrollGravity) this.makeScrollGravity();
                createdTop = true;
            }
        });
    }

    createTopBound() {
        this.boundTop = Matter.Bodies.rectangle(0, 0, 2 * this.width, 500, { isStatic: true });
        Matter.Composite.add(this.engine.world, [this.boundTop]);
    }

    makeScrollGravity() {
        let lastScroll = 0;

        Matter.Events.on(this.runner, "tick", () => {
            const y = document.documentElement.scrollTop - document.documentElement.clientTop;
            const diff = y - lastScroll;
            this.engine.gravity.y = 0.7 - gsap.utils.clamp(-2, 4, 0.1 * diff);
            lastScroll = y;
        });
    }

    refresh() {
        if (this.height === this.DOM.element.offsetHeight &&
            this.width === this.DOM.element.offsetWidth) return;

        this.height = this.DOM.element.offsetHeight;
        this.width = this.DOM.element.offsetWidth;

        setTimeout(() => {
            this.updateBoundries();
            this.updateBodies();
        });
    }

    updateBoundries() {
        if (this.boundTop) {
            Matter.Body.setVertices(this.boundTop, Matter.Bodies.rectangle(0, -250, 2 * this.width, 500, { isStatic: true }).vertices);
        }

        Matter.Body.setPosition(this.boundStart, { x: -250, y: this.height / 2 });
        Matter.Body.setVertices(this.boundStart, Matter.Bodies.rectangle(-250, this.height / 2, 500, 4 * this.height, { isStatic: true }).vertices);

        Matter.Body.setPosition(this.boundEnd, { x: this.width + 250, y: this.height / 2 });
        Matter.Body.setVertices(this.boundEnd, Matter.Bodies.rectangle(this.width + 250, this.height / 2, 500, 4 * this.height, { isStatic: true }).vertices);

        Matter.Body.setPosition(this.boundBottom, { x: 0, y: this.height + 250 });
        Matter.Body.setVertices(this.boundBottom, Matter.Bodies.rectangle(0, this.height + 250, 2 * this.width, 500, { isStatic: true }).vertices);
    }

    updateBodies() {
        this.DOM.throwables.forEach((el, i) => {
            const body = this.bodies[i];
            const rect = el.getBoundingClientRect();

            const radius = this.options.roundness === "sharp" ? 0 : rect.height / 2;

            const newBody = Matter.Bodies.rectangle(body.position.x, body.position.y, rect.width, rect.height, {
                chamfer: { radius },
                angle: body.angle
            });

            Matter.Body.setVertices(body, newBody.vertices);

            if (body.position.y > this.height) {
                Matter.Body.setPosition(body, {
                    y: this.height / 2,
                    x: body.position.x
                });
            }

            if (body.position.x > this.width) {
                const x = gsap.utils.random(rect.width / 2, this.width - rect.width / 2);
                Matter.Body.setPosition(body, { x, y: body.position.y });
            }
        });
    }

    onWindowResize() {
        this.refresh();
    }

    destroy() {
        this.runner.enabled = false;
        Matter.Runner.stop(this.runner);
        window.removeEventListener("resize", this.onWindowResize);
    }
}

function initThrowableScenes() {
    const elements = document.querySelectorAll("[data-t-throwable-scene]");

    elements.forEach(el => {
        if (!pluginStore.has(el)) {
            const options = el.dataset.throwableOptions ? JSON.parse(el.dataset.throwableOptions) : {};
            pluginStore.set(el, new ThrowableScene(el, options));
        }
    });
}

document.addEventListener("DOMContentLoaded", initThrowableScenes);