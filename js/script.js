document.addEventListener("DOMContentLoaded", function() {
    // Fonction pour mettre à jour le total
    function updateTotal() {
        let total = 0;
        document.querySelectorAll('.card').forEach(function(card) {
            const priceText = card.querySelector('.unit-price').innerText.trim();
            const price = parseFloat(priceText.replace('$', '').replace(',', ''));
            const quantity = parseInt(card.querySelector('.quantity').innerText);
            
            // Vérifier si le prix et la quantité sont des nombres valides
            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        });
        document.querySelector('.total').innerText = 'Total: $' + total;
    }

    // Fonction pour gérer les boutons d'augmentation et de diminution
    function updateQuantity(e) {
        const quantityElement = e.target.parentNode.querySelector('.quantity');
        let quantity = parseInt(quantityElement.innerText);

        if (e.target.classList.contains('fa-plus-circle')) {
            quantity += 1;
        } else if (e.target.classList.contains('fa-minus-circle') && quantity > 0) {
            quantity -= 1;
        }

        quantityElement.innerText = quantity;
        updateTotal();
    }

    // Fonction pour gérer les boutons de suppression
    function removeProduct(e) {
        const card = e.target.closest('.card');
        if (card) {
            card.remove();
            updateTotal();
        }
    }

    // Fonction pour gérer les boutons de favoris
    function toggleFavorite(e) {
        const icon = e.target;
    
        if (icon.style.color === 'red') {
            icon.style.color = 'black';
        } else {
            icon.style.color = 'red';
        }
    }
    
    
    // Ajouter les événements de clic aux boutons d'augmentation et de diminution
    document.querySelectorAll('.fa-plus-circle, .fa-minus-circle').forEach(function(icon) {
        icon.addEventListener('click', updateQuantity);
    });

    // Ajouter les événements de clic aux boutons de suppression
    document.querySelectorAll('.fa-trash-alt').forEach(function(icon) {
        icon.addEventListener('click', removeProduct);
    });

    // Ajouter les événements de clic aux boutons de favoris
    document.querySelectorAll('.fa-heart, .fa-heart-o').forEach(function(icon) {
        icon.addEventListener('click', toggleFavorite);
    });

    // Mettre à jour le total au chargement de la page
    updateTotal();
});
