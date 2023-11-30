function updateTotalAmount() {
    let cartItems = document.querySelectorAll('.cart .item');
    let totalAmount = 0;

    cartItems.forEach(item => {
        let priceText = item.querySelector('.price').textContent;
        let price = parseFloat(priceText.replace(/[^\d.]/g, ''));
        let count = parseInt(item.querySelector('.count').value);
        totalAmount += price * count;
    });

    document.getElementById('total-amount').textContent = `₱ ${totalAmount.toFixed(2)}`;
}

function ToggleFavorite(key) {
    let item = document.querySelector('.list .item[data-key="' + key + '"]');
    let favoriteButton = item.querySelector('.favourite');

    if (item.classList.contains('favorite')) {
        item.classList.remove('favorite');
        favoriteButton.classList.remove('favorite-icon');
    } else {
        item.classList.add('favorite');
        favoriteButton.classList.add('favorite-icon');
    }
    updateTotalAmount();
}

function Remove(key) {
    let listCart = document.querySelectorAll('.cart .item');
    listCart.forEach(item => {
        if (item.getAttribute('data-key') == key) {
            item.remove();
            updateTotalAmount();
            return;
        }
    });
}

let list = document.querySelectorAll('.list .item');
list.forEach(item => {
    item.addEventListener('click', function(event) {
        if (event.target.classList.contains('add')) {
            var itemNew = item.cloneNode(true);
            let checkIsset = false;

            let listCart = document.querySelectorAll('.cart .item');
            listCart.forEach(cart => {
                if (cart.getAttribute('data-key') == itemNew.getAttribute('data-key')) {
                    checkIsset = true;
                    cart.classList.add('danger');
                    setTimeout(function() {
                        cart.classList.remove('danger');
                    }, 1000);
                }
            });

            if (checkIsset == false) {
                document.querySelector('.listCart').appendChild(itemNew);
                updateTotalAmount();
            }
        }
    });

    let favoriteButton = item.querySelector('.favourite');
    favoriteButton.addEventListener('click', function(event) {
        let key = item.getAttribute('data-key');
        ToggleFavorite(key);
    });

    let removeButton = item.querySelector('.remove');
    removeButton.addEventListener('click', function(event) {
        let key = item.getAttribute('data-key');
        Remove(key);
    });
});

// Initial call to update the total amount
updateTotalAmount();
