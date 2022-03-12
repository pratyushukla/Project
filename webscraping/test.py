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
	
# data rows of csv file
# rows = [ ['Nikhil', 'COE', '2', '9.0'],
# 		['Sanchit', 'COE', '2', '9.1'],
# 		['Aditya', 'IT', '2', '9.3'],
# 		['Sagar', 'SE', '1', '9.5'],
# 		['Prateek', 'MCE', '3', '7.8'],
# 		['Sahil', 'EP', '2', '9.1']]
	
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







# with open("data.txt","w",encoding="utf-8",newline="") as dataFile:
#     for item in data:
#         job=item.find(class_="title") 
#         exp=item.find(class_="experience")
#         sal=item.find(class_="salary")
#         skill=item.find(class_="job-description")
#         temp=""
#         if(job is not None):
#             temp+=job.text+" | "
#         else:
#             temp+="NA | "
#         if(exp is not None):
#             temp+=exp.text+" | "
#         else:
#             temp+="NA | "
#         if(sal is not None):
#             temp+=sal.text+" | "
#         else:
#             temp+="NA | "
#         if(skill is not None):
#             temp+=skill.text+" | "
#         else:
#             temp+="NA | "
#         jobs.append(temp)
#     for job in jobs:
#         dataFile.write(job+"\n")


driver.close()