document.addEventListener('DOMContentLoaded', function () {
    var mapTrigger = document.getElementById('mapTrigger');
    var mapContainer = document.getElementById('mapContainer');
    var addressLink = document.querySelector('.adress a');

    // Выста, ширина и смещение карты (вы можете изменить это значение)
    var appearanceHeight = -730;
    var appearanceOffset = 620;
    var mapWidth = 450;
    var mapHeight = 450;

    var isMapOpen = false;

    function showMap() {
        var mapHtml = "<iframe src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24110.305231468376!2d24.668262980712907!3d60.20557812239586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x469209ee9a3b377f%3A0x3622d575206b29c9!2sEspoo%2C%20Finland!5e0!3m2!1sen!2sus!4v1672794228327!5m2!1sen!2sus' width='" + mapWidth + "' height='" + mapHeight + "' style='border:0;' allowfullscreen='' loading='lazy'></iframe>";
        mapContainer.innerHTML = mapHtml;

        // Позиционируем карту по центру экрана по горизонтали и с учетом заданной высоты, смещения и размеров
        var x = (window.innerWidth - mapContainer.offsetWidth) / 2 + appearanceOffset;
        var y = window.innerHeight - mapContainer.offsetHeight - appearanceHeight;

        // Проверяем, чтобы карта не выходила за пределы экрана
        if (x < 0) {
            x = 0;
        }

        if (y < 0) {
            y = 0;
        }

        mapContainer.style.left = x + 'px';
        mapContainer.style.top = y + 'px';

        mapContainer.style.display = 'block';
        isMapOpen = true;

        // Показываем текст при открытии карты
        addressLink.style.visibility = 'visible';
        addressLink.style.textDecoration = 'underline';
        addressLink.style.fontSize = '150%';
    }

    function hideMap() {
        // Показываем текст при закрытии карты
        addressLink.style.visibility = 'visible';
        addressLink.style.textDecoration = 'none';
        addressLink.style.fontSize = '100%';

        mapContainer.innerHTML = "";
        mapContainer.style.display = 'none';
        isMapOpen = false;
    }

    mapTrigger.addEventListener('mouseover', function () {
        if (!isMapOpen) {
            showMap();
        }
    });

    mapTrigger.addEventListener('mouseout', function () {
        if (isMapOpen) {
            // Убираем карту с задержкой, чтобы пользователь мог случайно навести на нее
            setTimeout(function () {
                hideMap();
            }, 300);
        }
    });

    document.addEventListener('click', function (event) {
        // Скрываем карту при клике вне ее области
        if (isMapOpen && !mapContainer.contains(event.target)) {
            hideMap();
        }
    });
});
