
function setupWidget(widgetId) {
  const widget = document.getElementById(widgetId);
  const resizeHandle = widget.querySelector('.resize-handle');
  
  const widgetHeader = widget.querySelector('.widget-header');
  const closeButton = widget.querySelector('.close-button');

  let isResizing = false;
  let originalWidth, originalHeight;
  let isDragging = false;
  let initialX, initialY; // Initial cursor position for dragging
  let initialResizeX, initialResizeY; // Initial cursor position for resizing

  resizeHandle.addEventListener('mousedown', (e) => {
    isResizing = true;
    originalWidth = widget.offsetWidth;
    originalHeight = widget.offsetHeight;
    initialResizeX = e.clientX;
    initialResizeY = e.clientY;
    e.preventDefault();
  });

  widgetHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    initialX = e.clientX - parseFloat(getComputedStyle(widget).left); // Store initial cursor position for dragging
    initialY = e.clientY - parseFloat(getComputedStyle(widget).top); // Store initial cursor position for dragging
    e.preventDefault();
  });
  

  document.addEventListener('mousemove', (e) => {
    if (isResizing) {
      const newWidth = originalWidth + (e.clientX - initialResizeX);
      const newHeight = originalHeight + (e.clientY - initialResizeY);
      widget.style.width = `${newWidth}px`;
      widget.style.height = `${newHeight}px`;
    } else if (isDragging) {
      const newX = e.clientX - initialX;
      const newY = e.clientY - initialY;
      widget.style.left = `${newX}px`;
      widget.style.top = `${newY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isResizing = false;
    isDragging = false;
  });

  closeButton.addEventListener('click', () => {
    widget.style.display = 'none';
  });
}

const widgetIds = ['widget1','widgetChat'];

widgetIds.forEach(widgetId => {
  setupWidget(widgetId);
});




//боковая панель у главного виджета ежедневник
const panelTitle = document.getElementById('panelTitle');
const panelContent = document.getElementById('panelContent');
const tableRows = document.querySelectorAll('.widget-table tbody tr');
const widgetTextColumn = document.getElementById('widgetTextColumn');

// Обработчики событий для каждой строки таблицы
tableRows.forEach((row, index) => {
  row.addEventListener('click', () => {
    if (widgetTextColumn.style.display === 'block') {
      // Если панель открыта и была нажата та же строка, закрываем панель
      widgetTextColumn.style.display = 'none';
    } else {
      // Иначе, отображаем панель и обновляем данные
      handleRowClick(index);
      const rowData = getRowData(index);
      panelTitle.textContent = rowData.title;
      panelContent.textContent = rowData.content;
      row.classList.add('selected-row');
    }
  });
});


function getRowData(index) {
  // Возвращаем данные в зависимости от индекса строки
  if (index === 0) {
    return {
      title: 'Заголовок для первой строки',
      content: 'Содержимое первой строки...'
    };
  } else if (index === 1) {
    return {
      title: 'Заголовок для второй строки',
      content: 'Содержимое второй строки...'
    };
  }

}

//Выпадающий список работников

const rowStates = {};

// Функция для обработки нажатия на строку
function handleRowClick(index) {
  // Скрываем все открытые панели
  for (const stateIndex in rowStates) {
    if (rowStates[stateIndex]) {
      rowStates[stateIndex] = false;
    }
  }
  
  // Отображаем панель и меняем состояние на true
  widgetTextColumn.style.display = 'block';
  rowStates[index] = true;
}
$(document).ready(function() {
  $('.clickable-cell').click(function() {
    // Очистка содержимого выпадающей таблицы
    $('#dropdownTable').empty();

    // Получение содержимого ячеек строки
    var cells = $(this).parent().children();
    var rowContent = '';
    cells.each(function() {
      rowContent += '<td>' + $(this).text() + '</td>';
    });

    // Добавление строки в выпадающую таблицу
    $('#dropdownTable').append('<tr>' + rowContent + '</tr>');

    // Позиционирование и отображение выпадающей таблицы
    var dropdownContainer = $('#dropdownTableContainer');
    dropdownContainer.css('display', 'block');
    dropdownContainer.offset({ top: $(this).offset().top + $(this).outerHeight(), left: $(this).offset().left });
  });
});


$(document).ready(function() {
  $('.workshop-title1').click(function() {
    $(this).toggleClass('active');
    $(this).next('.projects1').slideToggle();
  });

  $('.projects_name_list').click(function() {
    $(this).toggleClass('active');
    $(this).next('.sub-projects1').slideToggle();
  });

  $('.TaskWorkShopTask.tasks_name_list').click(function() {
    $(this).toggleClass('active');
    $(this).next('.sub-task-projects1').slideToggle();
  });

  // И так далее...
});


// План выполнения


const projects = document.querySelectorAll('.plan');

projects.forEach((project) => {
  const subProjects = project.querySelectorAll('.sub-projects');
  subProjects.forEach((subProject)=>{

    project.addEventListener('click', () => {
      subProject.classList.toggle('visible');
    });
  })

});
// скрипт выбора элементов в выпадающем меню
// Находим выпадающий список
const widgetSelect = document.getElementById('widget-select');

// Добавляем обработчик события при изменении значения выпадающего списка
widgetSelect.addEventListener('change', function () {
  const selectedWidget = widgetSelect.value;

  // Находим выбранное окно
  const selectedWidgetElement = document.getElementById(selectedWidget);

  // Проверяем, если окно уже отображается, то скрываем его, иначе отображаем

  if (selectedWidgetElement.style.display === 'none' || selectedWidgetElement.style.display === '') {
    selectedWidgetElement.style.display = 'block';
  }
});



const initialWidgetState = {};
// Функция для разворачивания виджета на весь экран
function expandWidget(widgetId) {
  const widget = document.getElementById(widgetId);

  // Сохраняем начальные размеры и положение виджета перед раскрытием
  initialWidgetState[widgetId] = {
    width: widget.style.width,
    height: widget.style.height,
    top: widget.style.top,
    left: widget.style.left,
  };

  // Устанавливаем новые размеры и положение для раскрытого виджета
  widget.classList.add('expanded');
  widget.style.width = '100%';
  widget.style.height = '100%';
  widget.style.top = '0';
  widget.style.left = '0';
  // Другие стили раскрытого виджета
}



// Функция для сворачивания виджета обратно в исходное состояние
function collapseWidget(widgetId) {
  const widget = document.getElementById(widgetId);

  // Восстанавливаем начальные размеры и положение виджета перед раскрытием
  const initialState = initialWidgetState[widgetId];
  if (initialState) {
    widget.style.width = initialState.width;
    widget.style.height = initialState.height;
    widget.style.top = initialState.top;
    widget.style.left = initialState.left;
  }

  // Удаляем запись о начальном состоянии
  delete initialWidgetState[widgetId];

  // Убираем класс раскрытия
  widget.classList.remove('expanded');
  // Другие стили для свернутого виджета
}
//bcghfddktybz
// Функция для переключения состояния виджета при клике на кнопку
function toggleFullscreen(widgetId) {
  const widget = document.getElementById(widgetId);

  if (widget.classList.contains('expanded')) {
    collapseWidget(widgetId);
  } else {
    expandWidget(widgetId);
  }


}

// Назначаем обработчик клика на кнопку разворачивания/сворачивания
const uncollapseButtons = document.querySelectorAll('.uncollapse-button');

uncollapseButtons.forEach(button => {
  const widgetId = button.closest('.resizable-widget').id;
  button.addEventListener('click', () => {
    toggleFullscreen(widgetId);
  });
});


//Изменение z-index при клике по виджету
const widgets = document.querySelectorAll('.resizable-widget');
widgets.forEach(widget => {
  widget.addEventListener('click', () => {
    // Уберем активное состояние у всех виджетов
    widgets.forEach(w => {
      w.style.zIndex = '1'; // Возвращаем z-index в исходное состояние
    });

    // Устанавливаем активное состояние и повышаем z-index для текущего виджета
    widget.style.zIndex = '2'; // Изменяем z-index для активного виджета
  });
});



