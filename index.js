// Datos de los productos
const products = [
    {
        title: "Taco al Pastor",
        description: "Taco con carne de cerdo marinada, piña y salsa roja. Un clásico del sabor.",
        image: "https://bit.ly/3Or4Yvq",
        cost: 35.00
    },
    {
        title: "Taco de Bistec",
        description: "Taco con carne de res asada, cebolla, cilantro y salsa verde. Perfecto para los amantes de la carne.",
        image: "https://bit.ly/3O5OZ9F",
        cost: 40.00
    },
    {
        title: "Taco de Suadero",
        description: "Taco con carne de res suadero, jugoso y sabroso, acompañado de cebolla y salsa de mango.",
        image: "https://bit.ly/3OCueZ5",
        cost: 45.00
    },
    {
        title: "Taco de Pescado",
        description: "Taco con filete de pescado empanizado, repollo, mayonesa y salsa de chipotle.",
        image: "https://bit.ly/3O9E2z0",
        cost: 50.00
    },
    {
        title: "Taco Vegano",
        description: "Taco vegano con setas, aguacate y salsa de tamarindo, ideal para quienes buscan opciones saludables.",
        image: "https://bit.ly/3tDCExQ",
        cost: 40.00
    },
    {
        title: "Taco de Carnitas",
        description: "Taco con carne de cerdo desmenuzada, cebolla, cilantro y salsa de chile de árbol.",
        image: "https://bit.ly/3O8y5i2",
        cost: 38.00
    }
];

// Cargar los productos en la página
document.addEventListener("DOMContentLoaded", () => {
    const productContainer = document.getElementById('productos');
    if (!productContainer) {
        console.error("Contenedor de productos no encontrado");
        return;
    }

    // Renderizar los productos
    products.forEach((product, index) => {
        const productCard = document.createElement('div');
        productCard.classList.add('col-md-6', 'col-lg-4', 'd-flex', 'justify-content-center', 'mb-4');
        productCard.innerHTML = `
            <div class="card text-center shadow-sm">
                <img src="${product.image}" class="card-img-top" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.cost.toFixed(2)}</strong></p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#purchaseModal" 
                        data-index="${index}">Comprar</button>
                    <button class="btn btn-warning mt-2" data-bs-toggle="modal" data-bs-target="#personalizationModal"
                        data-index="${index}">Personalizar</button>
                </div>
            </div>
        `;
        productContainer.appendChild(productCard);
    });

    // Asignar eventos a botones
    setupModalEvents();
});

// Configuración de eventos para los modales
function setupModalEvents() {
    const purchaseModal = document.getElementById('purchaseModal');
    const personalizationModal = document.getElementById('personalizationModal');

    // Comprar producto
    purchaseModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const productIndex = button.getAttribute('data-index');
        updatePurchaseModal(productIndex);
    });

    // Personalizar producto
    personalizationModal.addEventListener('show.bs.modal', (event) => {
        const button = event.relatedTarget;
        const productIndex = button.getAttribute('data-index');
        updatePersonalizationModal(productIndex);
    });
}

// Actualizar contenido del modal de compra
function updatePurchaseModal(productIndex) {
    const product = products[productIndex];
    if (!product) return;

    document.getElementById('productCost').textContent = `Precio: $${product.cost.toFixed(2)}`;
}

// Actualizar contenido del modal de personalización
function updatePersonalizationModal(productIndex) {
    const product = products[productIndex];
    if (!product) return;

    // Aquí podrías agregar lógica para personalizar opciones específicas según el producto
    console.log(`Personalizando ${product.title}`);
}

// Validación del formulario de compra
document.getElementById('purchaseForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const age = parseInt(document.getElementById('age').value, 10);
    const email = document.getElementById('email').value.trim();

    if (!name || !address || !age || !email) {
        alert("Por favor, complete todos los campos del formulario.");
        return;
    }

    if (age < 18) {
        alert("Debe ser mayor de edad para realizar una compra.");
        return;
    }

    alert("¡Compra realizada con éxito!");
    // Aquí puedes añadir lógica para enviar los datos al servidor
});

// Confirmar personalización
document.getElementById('confirmPersonalization').addEventListener('click', () => {
    const salsa = document.getElementById('color').value;
    const toppings = document.getElementById('accessories').value.trim();

    if (!salsa || salsa === "Seleccione una salsa") {
        alert("Por favor, seleccione una salsa.");
        return;
    }

    alert(`Personalización confirmada: Salsa - ${salsa}, Toppings - ${toppings}`);
});