// Функция для выполнения кода скрипта
function runScript() {
  // Функция для получения списка уникальных значений из массива
  function getUniqueValues(array) {
    let uniqueValues = [];
    for (let value of array) {
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    }
    return uniqueValues;
  }

  // // Функция для фильтрации массива по заданному значению
  // function filterByValue(array, value) {
  //   let filteredArray = [];
  //   for (let item of array) {
  //     if (item === value) {
  //       filteredArray.push(item);
  //     }
  //   }
  //   return filteredArray;
  // }

  // Функция для создания элемента option для datalist
  function createOption(value) {
    let option = document.createElement("option");
    option.value = value;
    return option;
  }

  // Функция для очистки содержимого datalist
  function clearDatalist(datalist) {
    while (datalist.firstChild) {
      datalist.removeChild(datalist.firstChild);
    }
  }

  // Функция для заполнения datalist данными из массива
  function fillDatalist(datalist, array) {
    for (let value of array) {
      let option = createOption(value);
      datalist.appendChild(option);
    }
  }

  // Функция для обновления datalist в зависимости от введенного значения
  function updateDatalist(input, datalist, array) {
    // Получить введенное значение
    let inputValue = input.value;

    // Очистить datalist
    clearDatalist(datalist);

    // Если введенное значение не пустое
    if (inputValue) {
      // Получить подсказки, которые начинаются с введенного значения
      let suggestions = array.filter(item => item.startsWith(inputValue));

      // Заполнить datalist подсказками
      fillDatalist(datalist, suggestions);
    }
  }

  // Получить элементы формы
  let countryInput1 = document.getElementById("country-input-1");
  let regionInput1 = document.getElementById("region-input-1");
  let cityInput1 = document.getElementById("city-input-1");
  let countryInput2 = document.getElementById("country-input-2");
  let regionInput2 = document.getElementById("region-input-2");
  let cityInput2 = document.getElementById("city-input-2");

  let countryList1 = document.getElementById("country-list-1");
  let regionList1 = document.getElementById("region-list-1");
  let cityList1 = document.getElementById("city-list-1");
  let countryList2 = document.getElementById("country-list-2");
  let regionList2 = document.getElementById("region-list-2");
  let cityList2 = document.getElementById("city-list-2");
  var showRouteButton = document.getElementById("showRouteButton");
  let transport_type = document.getElementById("transport_type");
  

  // Создаем переменные для хранения координат городов
  var from_lat;
  var from_lon;
  var to_lat;
  var to_lon;
  var coordinates = [];

  // Получить данные о станциях из шаблона
  let stationsData = JSON.parse(document.getElementById("stations-data").textContent);
  localStorage.setItem("stationsData", stationsData);
  // Получить массивы стран, регионов и городов из данных о станциях
  let countries = getUniqueValues(stationsData.countries.map(country => country.title));
  // let regions = getUniqueValues(stationsData.countries.flatMap(country => country.regions.map(region => region.title)));
  // let cities = getUniqueValues(stationsData.countries.flatMap(country => country.regions.flatMap(region => region.settlements.map(city => city.title))));

  // Добавить обработчики событий ввода значения input

  // При вводе значения в первый input страны
  countryInput1.addEventListener("input", function () {
    // Обновить datalist стран
    updateDatalist(this, countryList1, countries);

    // Очистить input и datalist регионов и городов
    regionInput1.value = "";
    clearDatalist(regionList1);
    cityInput1.value = "";
    clearDatalist(cityList1);
  });

  // При вводе значения в первый input региона
  regionInput1.addEventListener("input", function () {
    // Получить выбранную страну
    let selectedCountry = countryInput1.value;

    // Если выбрана страна
    if (selectedCountry) {
      // Получить регионы, принадлежащие выбранной стране
      let countryRegions = stationsData.countries.find(country => country.title === selectedCountry).regions;

      // Получить массив названий регионов
      let regionNames = countryRegions.map(region => region.title);

      // Обновить datalist регионов
      updateDatalist(this, regionList1, regionNames);
    }

    // Очистить input и datalist городов
    cityInput1.value = "";
    clearDatalist(cityList1);
  });

  // При вводе значения в первый input города
  cityInput1.addEventListener("input", function () {
    // Получить выбранный регион
    let selectedRegion = regionInput1.value;

    // Если выбран регион
    if (selectedRegion) {
      // Получить города, принадлежащие выбранному региону
      let regionCities = stationsData.countries.flatMap(country => country.regions).find(region => region.title === selectedRegion).settlements;

      // Получить массив названий городов
      let cityNames = regionCities.map(city => city.title);

      // Обновить datalist городов
      updateDatalist(this, cityList1, cityNames);
    }
  });

  // При вводе значения во второй input страны
  countryInput2.addEventListener("input", function () {
    // Обновить datalist стран
    updateDatalist(this, countryList2, countries);

    // Очистить input и datalist регионов и городов
    regionInput2.value = "";
    clearDatalist(regionList2);
    cityInput2.value = "";
    clearDatalist(cityList2);
  });

  // При вводе значения во второй input региона
  regionInput2.addEventListener("input", function () {

    // Получить выбранную страну
    let selectedCountry = countryInput2.value;

    // Если выбрана страна
    if (selectedCountry) {
      // Получить регионы, принадлежащие выбранной стране
      let countryRegions = stationsData.countries.find(country => country.title === selectedCountry).regions;

      // Получить массив названий регионов
      let regionNames = countryRegions.map(region => region.title);

      // Обновить datalist регионов
      updateDatalist(this, regionList2, regionNames);
    }

    // Очистить input и datalist городов
    cityInput2.value = "";
    clearDatalist(cityList2);
  });

  // При вводе значения во второй input города
  cityInput2.addEventListener("input", function () {
    // Получить выбранный регион
    let selectedRegion = regionInput2.value;

    // Если выбран регион
    if (selectedRegion) {
      // Получить города, принадлежащие выбранному региону
      let regionCities = stationsData.countries.flatMap(country => country.regions).find(region => region.title === selectedRegion).settlements;

      // Получить массив названий городов
      let cityNames = regionCities.map(city => city.title);

      // Обновить datalist городов
      updateDatalist(this, cityList2, cityNames);
    }
  });

  // Создаем функцию для получения координат по названию города
  function getCoordinates(city, selectedRegion) {
    // Получаем данные о станциях из скрытого div
    // var stations = JSON.parse(document.getElementById("stations-data").textContent);

    // Получить станции принадлежащие данному городу
    stations = stationsData.countries.flatMap(country => country.regions).find(region => region.title === selectedRegion).settlements.find(settlement => settlement.title === city).stations;

    // stations = stations["countries"][0]["regions"][0]["settlements"];
    // Проходим по каждой станции и ищем заполненные широту и долготу
    for (var i = 0; i < stations.length; i++) {
      if (stations[i]["latitude"] != "") {
        // Возвращаем координаты станции в виде массива, обернутые в промис
        return [stations[i]["latitude"], stations[i]["longitude"]];
        //return Promise.resolve([stations[i]["latitude"], stations[i]["longitude"]]);
      }
    }
    return [0,0];
    // Если не нашли совпадение, возвращаем null, обернутый в промис
    //return Promise.resolve(null);
  }
  // Добавляем обработчик события на клик по кнопке
  showRouteButton.addEventListener("click", function () {
    // Получаем значение инпута
    var city1 = cityInput1.value;
    var city2 = cityInput2.value;
    var coords;
    // Получаем координаты по названию города
    coords = getCoordinates(city1, regionInput1.value);
      if (coords) {
        from_lat = coords[0];
        from_lon = coords[1];
      }
    

      coords=getCoordinates(city2, regionInput2.value);
      if (coords) {
        to_lat = coords[0];
        to_lon = coords[1];
      }
    

    // Создаем пустой массив для хранения координат
    coordinates = [];
    // Получаем все input с name, начинающимся с "city"
    var cityInputs = document.querySelectorAll("input[name^='city']");
    // Проходим по всем input
    cityInputs.forEach(function(cityInput) {
      // Получаем значение инпута
      var city = cityInput.value;
      // Получаем номер группы полей (1, 2, 3 и т.д.)
      var number = cityInput.id.split("-")[2];
      // Получаем соответствующий input региона
      var regionInput = document.getElementById("region-input-" + number);
      // Получаем координаты по названию города и региона
      coords=getCoordinates(city, regionInput.value)
        // Если координаты найдены, добавляем их в массив
        if (coords) {
          coordinates.push(coords);
        }
      
    });
    // Делаем что-то с массивом координат
    console.log(coordinates);


    // Проверяем, что оба города заданы и вызываем функцию showRoute()
    checkAndShowRoute();
  });
  // Создаем функцию для проверки, что оба города заданы и вызова функции showRoute()
  function checkAndShowRoute() {
    if (from_lat && from_lon && to_lat && to_lon) {
      showRoute(from_lat, from_lon, to_lat, to_lon);
    }
  }
  // Создаем функцию для получения и отображения маршрута
  function showRoute(from_lat, from_lon, to_lat, to_lon) {
    // Создаем элемент для карты
    ymaps.ready(function () {
      // Проверяем, что карта существует
      // var mapContainer = document.getElementById("map");
      // // Получаем объект карты по HTML-элементу
      // var map = ymaps.Map.getByContainer(mapContainer);
      // // Если карта существует, выводим ее центр и зум
      // if (map) {
      //   console.log(map.getCenter(), map.getZoom());
      // }
      // else
      {
      //создаем новую
      var map = new ymaps.Map("map", {
        center: [55.75, 37.62],
        zoom: 10
      });

      // Добавляем элементы управления на карту
      map.controls.add("zoomControl");
      map.controls.add("typeSelector");
      }
      var route;
      route = solveTSP(coordinates, false);
      // Формируем URL для запроса к HTTP Геокодеру по координатам
      if (transport_type.value === "plane") 
      {
          var line = new ymaps.Polyline(
              //   [
              //    [from_lat, from_lon], // откуда
              //   [to_lat, to_lon ] // куда
              // ]
              route
              , {}, {
                  // Задаем стиль и цвет линии
                  strokeColor: "#0000FF",
                  strokeWidth: 4,
                  strokeOpacity: 0.5
              });
              
        // Добавляем линию на карту
        map.geoObjects.add(line);
        map.setBounds(line.geometry.getBounds());
        // Подключаем модуль arrow.js, который содержит класс Arrow и его визуальное отображение ArrowOverlay
        ymaps.modules.require(['arrow'], function (Arrow) {
          // Создаем массив цветов для стрелок
          var colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF", "#00FFFF"];
          // Проходим по всем сегментам маршрута
          for (var i = 0; i < route.length - 1; i++) {
            // Получаем координаты начала и конца сегмента
            var from = route[i];
            var to = route[i + 1];
            // Создаем объект-стрелку с заданным цветом из массива
            var arrow = new Arrow([from, to], {}, {strokeColor: colors[i % colors.length]});
            // Добавляем стрелку на карту
            map.geoObjects.add(arrow);
          }
        });
      }
      else
      {
        var urls =[];
        for (var i = 0; i < route.length; i++) {
          urls.push("https://geocode-maps.yandex.ru/1.x/?apikey=9431bf30-a1d4-4319-88e3-b17a8ad8830b&format=json&geocode=" + route[i][1] + "," + route[i][0]);

        }  
        // var url1 = "https://geocode-maps.yandex.ru/1.x/?apikey=9431bf30-a1d4-4319-88e3-b17a8ad8830b&format=json&geocode=" + from_lon + "," + from_lat;
        // var url2 = "https://geocode-maps.yandex.ru/1.x/?apikey=9431bf30-a1d4-4319-88e3-b17a8ad8830b&format=json&geocode=" + to_lon + "," + to_lat;

        
  
        // Делаем запросы с помощью fetch и обрабатываем ответы
        // Promise.all([fetch(url1), fetch(url2)])
        Promise.all(urls.map(u=>fetch(u)))
          .then(function (responses) {
            return Promise.all(responses.map(function (response) {
              return response.json();
            }));
          })
          .then(function (data) {
            // Извлекаем названия городов из ответов
            var cities =[]
            for (var i = 0; i < data.length; i++) {
              cities.push(data[i]["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["metaDataProperty"]["GeocoderMetaData"]["text"]);
            }
            // var city1 = data[0]["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["metaDataProperty"]["GeocoderMetaData"]["text"];
            // var city2 = data[1]["response"]["GeoObjectCollection"]["featureMember"][0]["GeoObject"]["metaDataProperty"]["GeocoderMetaData"]["text"];
            // Создаем маршрут по названиям городов с помощью библиотеки JavaScript API
            // ymaps.route([city1, city2], { mapStateAutoApply: true, type: "plane"})
            ymaps.route(cities, { mapStateAutoApply: true, type: "plane"})
              .then(function (route) {
                // Добавляем маршрут на карту
                map.geoObjects.add(route);
                // Добавляем метки с названиями городов на карту
                route.getWayPoints().each(function (wayPoint) {
                  wayPoint.options.set("preset", "islands#redStretchyIcon");
                });
              })
              .catch(function (error) {
                // Выводим ошибку в консоль
                console.log(error);
              });
          })
          .catch(function (error) {
            // Выводим ошибку в консоль
            console.log(error);
          });
      }
      
    });
    
  }

  // Вызываем функцию для отображения маршрута по заданным координатам
  //showRoute(55.75, 37.62, 59.95, 30.32);
  

// Получаем ссылку на fieldset
var fieldset = document.querySelector("fieldset:last-of-type");

// Назначаем обработчик события input на fieldset
fieldset.addEventListener("input", function(event) {
  // Получаем ссылку на измененный input
  var input = event.target;
  // Получаем id и name измененного input
  var id = input.id;
  var name = input.name;
  // Получаем номер группы полей (1, 2, 3 и т.д.)
  var number = id.split("-")[2];
  // Получаем datalist, связанный с измененным input
  var datalist = document.getElementById(input.list.id);
  // Определяем, какое поле было изменено
  if (name.startsWith("country")) {
    // Обновить datalist стран
    updateDatalist(input, datalist, countries);

    // Очистить input региона и города для текущей группы полей
    var regionInput = document.getElementById("region-input-" + number);
    regionInput.value = "";
    var cityInput = document.getElementById("city-input-" + number);
    cityInput.value = "";
    
    // Очистить datalist регионов и городов
    clearDatalist(document.getElementById("region-list"));
    clearDatalist(document.getElementById("city-list"));
  } else if (name.startsWith("region")) {
    // Получить выбранную страну
    let selectedCountry = document.getElementById("country-input-" + number).value;

    // Если выбрана страна
    if (selectedCountry) {
      // Получить регионы, принадлежащие выбранной стране
      let countryRegions = stationsData.countries.find(country => country.title === selectedCountry).regions;

      // Получить массив названий регионов
      let regionNames = countryRegions.map(region => region.title);

      // Обновить datalist регионов
      updateDatalist(input, datalist, regionNames);
    }

    // Очистить input города для текущей группы полей
    var cityInput = document.getElementById("city-input-" + number);
    cityInput.value = "";
    
    clearDatalist(document.getElementById("city-list"));
  } else if (name.startsWith("city")) {
    // Получить выбранный регион
    let selectedRegion = document.getElementById("region-input-" + number).value;

    // Если выбран регион
    if (selectedRegion) {
      // Получить города, принадлежащие выбранному региону
      let regionCities = stationsData.countries.flatMap(country => country.regions).find(region => region.title === selectedRegion).settlements;

      // Получить массив названий городов
      let cityNames = regionCities.map(city => city.title);

      // Обновить datalist городов
      updateDatalist(input, datalist, cityNames);
    }
  }
});

  // Функция для сохранения пар регионов-городов в localstorage
function saveRegionsCities() {
  // Создаем пустой массив для хранения пар
  let regionsCities = [];
  // Получаем все элементы input с атрибутом name, начинающимся с "region-" или "city-"
  let inputs = document.querySelectorAll("input[name^='region-'], input[name^='city-']");
  // Проходим по всем элементам input и добавляем их значения в массив в виде объектов {region: ..., city: ...}
  for (let i = 0; i < inputs.length; i += 2) {
    // Проверяем, что оба значения не пустые
    if (inputs[i].value && inputs[i+1].value) {
      // Добавляем объект с регионом и городом в массив
      regionsCities.push({region: inputs[i].value, city: inputs[i+1].value});
    }
  }
  // Преобразуем массив в строку JSON и сохраняем в localstorage под ключом "regionsCities"
  localStorage.setItem("regionsCities", JSON.stringify(regionsCities));
}

// Функция для извлечения пар регионов-городов из localstorage и заполнения формы
function loadRegionsCities() {
  // Получаем строку JSON из localstorage по ключу "regionsCities"
  let regionsCities = localStorage.getItem("regionsCities");
  // Проверяем, что строка не пустая
  if (regionsCities) {
    // Преобразуем строку в массив объектов
    regionsCities = JSON.parse(regionsCities);
    // Проходим по всем объектам в массиве и заполняем соответствующие элементы input в форме
    for (let i = 0; i < regionsCities.length; i++) {
      // Получаем элементы input с атрибутом name, равным "region-" + (i+1) или "city-" + (i+1)
      let regionInput = document.querySelector("input[name='region-" + (i+1) + "']");
      let cityInput = document.querySelector("input[name='city-" + (i+1) + "']");
      // Проверяем, что элементы существуют
      if (regionInput && cityInput) {
        // Заполняем элементы значениями из объекта
        regionInput.value = regionsCities[i].region;
        cityInput.value = regionsCities[i].city;
      } else {
        // Если элементов нет, значит нужно добавить новую строку в форму
        addCity();
        // Повторяем те же действия для новых элементов
        regionInput = document.querySelector("input[name='region-" + (i+1) + "']");
        cityInput = document.querySelector("input[name='city-" + (i+1) + "']");
        regionInput.value = regionsCities[i].region;
        cityInput.value = regionsCities[i].city;
      }
    }
  }
}
// Получаем элемент формы по атрибуту action
let form = document.querySelector("form[action='/find_routes']");
// Добавляем обработчик события submit на форму
form.addEventListener("submit", function(event) {
  // Вызываем функцию для сохранения пар регионов-городов в localstorage
  saveRegionsCities();
  // Возвращаем true, чтобы продолжить отправку формы
  return true;
});


}




// Добавить функцию в качестве обработчика события DOMContentLoaded
document.addEventListener("DOMContentLoaded", runScript);