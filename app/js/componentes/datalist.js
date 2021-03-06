class DataList {
    constructor() {
        this.fields = document.querySelectorAll("[data-field]");
        this.json = [];
        this.controls = [];

        this.collapse = function (e, controls) {
            controls.forEach(control => {
                if (!(control.text === e.target || control.datalist === e.target))
                    control.datalist.classList.remove("datalist--show");
            });
        }
    }

    init(fn) {
        for (let field of this.fields) {
            const inputText = field.querySelector("[type='text']"),
                datalist = field.querySelector("datalist"),
                lista = field.querySelector("[data-list]");

            const dataButton = field.querySelector("[data-button]");

            if (dataButton) {
                dataButton.removeAttribute("data-button");

                const dataset = {
                    name: inputText.name,
                    id: inputText.id,
                    "datalist-id": datalist.id || ""
                }

                for (let property in dataset) {
                    dataButton.setAttribute(`data-${property}`, dataset[property]);
                }
            }

            // Eliminar el atributo no necesario:
            if ("list" in lista.dataset)
                lista.removeAttribute("data-list");

            // No seguir si estos elementos no existen:
            if (!inputText || !datalist) return;

            if ("list" in inputText) inputText.removeAttribute("list");

            // Obtener las opciones de un dataList:
            const options = datalist.querySelectorAll("option");

            this.json = [];
            options.forEach((option) => {
                this.json.push({
                    id: Number(option.value),
                    text: option.textContent
                });
            });

            const elements = {
                field: field,
                text: inputText,
                datalist: this.json,
                dataButton: dataButton
            };

            // Después de obtener los datos y procesarlos
            this.render(elements, function (datalist, hidden) {
                lista.append(datalist, hidden);
            });

            // Remove datalist of the DOM:
            if (datalist) {
                if ("id" in datalist)
                    datalist.removeAttribute("id");

                datalist.remove();
            }
        }

        if (typeof fn === "function") {
            this.controls.forEach(control => {
                fn(control);
            })
        }

        document.addEventListener("click", (e) => {
            this.collapse(e, this.controls);
        });
    }

    render(elements, fn) {
        const { field, datalist, text, dataButton } = elements;

        if (!Array.isArray(datalist) || typeof fn !== "function") return;
        const _datalist = document.createElement("div");
        _datalist.classList.add("datalist", "list__options");

        _datalist.innerHTML = "";
        datalist.forEach((element) => {
            _datalist.innerHTML = this.html(_datalist, element);
        });

        const hidden = document.createElement("input");
        hidden.setAttribute("type", "hidden");
        hidden.setAttribute("value", "");

        if ("name" in text) {
            hidden.setAttribute("name", text.getAttribute("name"));
            text.removeAttribute("name");
        }

        if ("id" in text) {
            let id = text.getAttribute("id");

            text.removeAttribute("id");
            hidden.setAttribute("id", id);
        }

        text.addEventListener("input", () => {
            _datalist.innerHTML = "";
            let { value } = text;

            if (!_datalist.classList.contains("datalist--show"))
                _datalist.classList.add("datalist--show");

            value = this.escape(value);

            // Expresión regular para las búsquedas:
            const expresion = new RegExp(`(${value})`, "im");

            datalist.forEach((element) => {
                if (expresion.test(element.text)) {
                    let texto = element.text.replace(expresion, (string) => {
                        return `<span class="datalist__coincidence">${string}</span>`;
                    });

                    _datalist.innerHTML = this.html(_datalist, {
                        id: element.id,
                        text: `<div>${texto}</div>`
                    });
                }
            });
        }, false);

        text.addEventListener("click", () => {
            _datalist.classList.toggle("datalist--show");
        }, false);

        text.addEventListener("keydown", (e) => {
            const { key } = e;

            if (key === "Escape")
                _datalist.classList.remove("datalist--show");

            if (key === "ArrowDown" || key === "ArrowUp" || key === "Enter")
                _datalist.classList.add("datalist--show");

            if (key === "ArrowDown") {
                _datalist.firstChild.focus();
            }

            if (key === "ArrowUp") {
                _datalist.lastChild.focus();
            }


            if (key === "Enter" && _datalist.childNodes.length === 1) {
                let [nodo] = _datalist.childNodes;
                _datalist.classList.remove("datalist--show");

                try {
                    text.value = nodo.textContent;
                    hidden.value = nodo.dataset.value;
                } catch (e) {
                    console.error("Error", e);
                }
            }

        }, false);

        text.addEventListener("focus", (e) => {
            this.collapse(e, this.controls);
        })


        const events = (_datalist, events) => {
            if (Array.isArray(events))
                events.forEach(event => {
                    _datalist.addEventListener(event, (e) => {

                        if (!("value" in e.target.dataset))
                            return;

                        if ((!("key" in e)) || (("key" in e) && e.key === "Enter")) {
                            hidden.value = e.target.dataset.value;
                            text.value = e.target.textContent;
                            text.focus();
                            _datalist.classList.remove("datalist--show");
                        }

                        if ("key" in e) {
                            const { key } = e;
                            //"previousElementSibling"
                            // "nextElementSibling"

                            const [previous, next] = [
                                e.target.previousElementSibling,
                                e.target.nextElementSibling
                            ];

                            if (key === "ArrowUp" && previous)
                                previous.focus();

                            if (key === "ArrowUp" && !previous)
                                text.focus();

                            if (key === "ArrowDown" && next)
                                next.focus();

                            if (key === "ArrowDown" && !next)
                                text.focus();

                            if (key === "Escape") {
                                text.focus();
                                _datalist.classList.remove("datalist--show");
                            }

                            if (
                                !(key === "ArrowUp" ||
                                    key === "ArrowDown" ||
                                    key === "Escape" ||
                                    key === "Tab")
                            ) {
                                text.focus();
                            }

                        }
                    })
                });
        };

        // Ejecutar tareas comunes en diferentes eventos:
        events(_datalist, ["click", "keydown"]);

        // Eleminar los atributos dataset:
        if ("field" in field.dataset)
            field.removeAttribute("data-field");


        // Get fields from the form / Obtener campos del formulario
        this.controls.push({
            field: field,
            text: text,
            hidden: hidden,
            datalist: _datalist,
            dataButton: dataButton || null
        })

        fn(_datalist, hidden);
    }

    html(datalist, element) {
        const { id, text } = element;

        if (typeof datalist === "undefined" || !datalist) return "";
        return `${datalist.innerHTML}<div class="datalist__item" data-value="${id}" tabindex="0">${text}</div>`;
    }

    escape(texto) {
        // Escapar caracteres especiales:
        texto = texto.replace(/(\\)/g, "\\\\");
        texto = texto.replace(/(\*)/g, "\\*");
        texto = texto.replace(/(\.)/g, "\\.");
        texto = texto.replace(/(\+)/g, "\\+");
        texto = texto.replace(/(\s)/g, "\\s");
        texto = texto.replace(/(\n)/g, "\\s");
        texto = texto.replace(/(\<)/g, "&lt;");
        texto = texto.replace(/(\>)/g, "&gt;");
        texto = texto.replace(/(\?)/g, "\\?");
        texto = texto.replace(/(\()/g, "\\(");
        texto = texto.replace(/([\)])/g, "\\)");
        texto = texto.replace(/([\[])/g, "\\[");
        texto = texto.replace(/([\]])/g, "\\]");
        return texto;
    }

    form(fn) {
        if (typeof fn === "function") fn(this.controls);
    }
}

export default DataList;

// // Se instancia e inicializa el objeto:
// const datalist = new DataList();
// datalist.init();

// addEventListener("click", (e) => {
//     if ("datalistId" in e.target.dataset) {
//         console.log(e.target.dataset);
//     }
// })