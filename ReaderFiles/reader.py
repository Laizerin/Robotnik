import xml.etree.ElementTree as ET
from bs4 import BeautifulSoup

# Загрузка XML файла
tree = ET.parse('test.xml')
root = tree.getroot()


#Роль Директор
with open('../MAINPAGES/Pages_v2/Buhgalter.html', 'r', encoding='utf-8') as html_file:
    soup = BeautifulSoup(html_file, 'html.parser')

##Рабочая версия заполнения сотрудников

container_div = soup.find("div", class_="container")

# Обходим каждый элемент employeeList в XML
for employee_list in root.findall(".//employeeList"):
    workshop_name = employee_list.find("workshopName").text
    # Создаем структуру HTML
    new_div = soup.new_tag("div", attrs={"class": "TaskWorkShop workshop-title1"})
    icon_and_text_div = soup.new_tag("div", attrs={"class": "icon-and-text"})
    img = soup.new_tag("img", attrs={"class": "arrow-picture", "src": "../../img/Arrowdown.png"})
    p = soup.new_tag("p", attrs={"class": "TaskBasicText icon-text"})
    icon_and_text_div.append(img)
    icon_and_text_div.append(p)
    new_div.append(icon_and_text_div)
    new_ul = soup.new_tag("ul", attrs={"class": "projects1"})

    for brigadeList in employee_list.findall(".//brigadeList"):
        brigade_text = brigadeList.find("brigadeText").text
        brigade_count = brigadeList.find("brigadeCount").text

        new_li = soup.new_tag("li", attrs={"class": "project1"})
        div_project_name_list = soup.new_tag("div", attrs={"class": "TaskWorkShopList projects_name_list"})
        div_icon_and_text = soup.new_tag("div", attrs={"class": "icon-and-text"})
        img = soup.new_tag("img", attrs={"class": "arrow-picture", "src": "../../img/Arrowdown.png", "alt": "Arrowdown"})
        p_brigade_text = soup.new_tag("p", attrs={"class": "TaskBasicText Brigade-text"})
        div_icon_and_text.append(img)
        div_icon_and_text.append(p_brigade_text)
        div_project_name_list.append(div_icon_and_text)
        div_project_name_list.append(p_brigade_text)

        p_brigade_count = soup.new_tag("p", attrs={"class": "TaskBasicText Brigade-Count"})
        div_project_name_list.append(p_brigade_count)

        ul_sub_projects1 = soup.new_tag("ul", attrs={"class": "sub-projects1"})
        table_employee = soup.new_tag("table", attrs={"class": "employee-table"})
        thead = soup.new_tag("thead")
        tr = soup.new_tag("tr")
        th_names = soup.new_tag("th")
        th_names.string = "Должность"
        th_status = soup.new_tag("th")
        th_status.string = "Статус"
        th_employee_id = soup.new_tag("th")
        th_employee_id.string = "Табельный номер"
        th_reward = soup.new_tag("th")
        th_reward.string = "Премия"
        tr.append(th_names)
        tr.append(th_status)
        tr.append(th_employee_id)
        tr.append(th_reward)
        thead.append(tr)
        table_employee.append(thead)
        tbody = soup.new_tag("tbody")

        # Получаем данные о сотрудниках из XML
        employee_data = []
        for employee in brigadeList.findall(".//employee"):
            employee_name = employee.find("name").text
            employee_status = employee.find("status").text
            employee_id = employee.find("employeeID").text
            employee_reward = employee.find("reward").text
            employee_data.append({"name": employee_name, "status": employee_status, "employee_id": employee_id, "reward": employee_reward})

        # Заполняем таблицу данными
        for data in employee_data:
            tr_employee = soup.new_tag("tr", attrs={"class": "person-row"})
            td_employee_name = soup.new_tag("td")
            td_employee_name.string = data["name"]
            td_employee_status = soup.new_tag("td",  attrs={"class": "highlight-green"})
            span_status = soup.new_tag("span")
            span_status.string = data["status"]
            td_employee_status.append(span_status)
            td_employee_id = soup.new_tag("td")
            td_employee_id.string = data["employee_id"]
            td_reward = soup.new_tag("td")
            td_reward.string = data["reward"]
            tr_employee.append(td_employee_name)
            tr_employee.append(td_employee_status)
            tr_employee.append(td_employee_id)
            tr_employee.append(td_reward)
            tbody.append(tr_employee)

        table_employee.append(tbody)
        ul_sub_projects1.append(table_employee)
        new_li.append(div_project_name_list)
        new_li.append(ul_sub_projects1)
        new_ul.append(new_li)
        new_div.append(new_ul)

        # Заполняем текстовые элементы данными
        p.string = workshop_name
        p_brigade_text.string = brigade_text
        p_brigade_count.string = brigade_count

        # Добавляем структуру HTML в контейнер
        container_div.append(new_div)
        container_div.append(new_ul)

# Преобразуем в строку
updated_html = soup.prettify()

# Сохраните измененный HTML обратно в файл
with open('../MAINPAGES/Pages_v2/BuhgalterNew.html', 'w', encoding='utf-8') as html_file:
    html_file.write(str(soup))

