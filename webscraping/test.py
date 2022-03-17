import requests
from bs4 import BeautifulSoup
import selenium 
import time
from selenium import webdriver


url="https://www.naukri.com/java-jobs"
driver = webdriver.Chrome('C:/WebDrivers/chromedriver.exe')
driver.get(url)

time.sleep(10)
driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
time.sleep(10)

soup = BeautifulSoup(driver.page_source,'html.parser')

soup.prettify()
data=soup.find_all(class_="jobTuple")

jobs=[]

# Python program to demonstrate
# writing to CSV


import csv
	
# field names
fields = ['Title', 'Experience', 'Salary', 'Skills']
	
# name of csv file
filename = "data.csv"
	
# writing to csv file
with open(filename, 'w', newline='') as csvfile:
    for item in data:
        job=item.find(class_="title") 
        exp=item.find(class_="experience")
        sal=item.find(class_="salary")
        skill=item.find(class_="has-description")
        temp=[]
        if(job is not None):
            temp.append(job.text)
        else:
            temp.append("NA")
        if(exp is not None):
            temp.append(exp.text)
        else:
            temp.append("NA")
        if(sal is not None):
            temp.append(sal.text)
        else:
            temp.append("NA")
        if(skill is not None):
            s=""
            for el in skill.find_all('li'):
                s+=el.text+" "
            temp.append(s)
        else:
            temp.append("NA")
        jobs.append(temp)
        temp=[]
    print(jobs)
    csvwriter = csv.writer(csvfile)
    # writing the fields
    csvwriter.writerow(fields)
    # writing the data rows
    csvwriter.writerows(jobs)


driver.close()