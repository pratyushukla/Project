from flask import Flask, jsonify,request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
import requests
from bs4 import BeautifulSoup
import selenium 
import time
from selenium import webdriver




@app.route('/predict',methods=['POST','GET'])
def hello():
    print(request.get_json())
    skill=request.get_json()
    skill=skill['skills']
    skill=skill.split(", ")
    skill="-".join(skill)
    url="https://www.naukri.com/"+skill+"-jobs?experience=0"
    url="".join(url.split())
    print(url)
    options=webdriver.ChromeOptions();
    options.headless=True
    options.add_argument('--lang=en_US') 
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
    options.add_argument('user-agent={0}'.format(user_agent))
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    driver.save_screenshot("ss.png")

    # time.sleep(5)
    # driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    # time.sleep(10)

    soup = BeautifulSoup(driver.page_source,'html.parser')

    soup.prettify()
    data=soup.find_all(class_="jobTuple")

    jobs=[]

    for item in data:
        job=item.find(class_="title")
        company=item.find(class_="subTitle")
        link=item.find(class_="title")["href"] 
        exp=item.find(class_="experience")
        sal=item.find(class_="salary")
        loc=item.find(class_="location")
        skill=item.find(class_="has-description")
        temp={}
        if(job is not None):
            temp["title"]=job.text
            temp["link"]=link
        else:
            temp["title"]="NA"
            temp["link"]="NA"
        if(company is not None):
            temp["company"]=company.text
        else:
            temp["company"]="NA"
        if(exp is not None):
            temp["experience"]=exp.text
        else:
            temp["experience"]="NA"
        if(sal is not None):
            temp["salary"]=sal.text
        else:
            temp["salary"]="NA"
        if(loc is not None):
            temp["location"]=loc.text
        else:
            temp["location"]="NA"
        if(skill is not None):
            s=""
            for el in skill.find_all('li'):
                s+=el.text+", "
            temp["skill"]=s
        else:
            temp["skill"]="NA"
        jobs.append(temp)
    # print(jobs)


    driver.close()

    response=jsonify(jobs)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response














# import pandas as pd
# import textdistance
# new_df=pd.read_csv('modified_data.csv')

# skills=new_df['skills']


# @app.route('/predict',methods=['POST','GET'])
# def hello():
#     print(request.get_json())
#     skill=request.get_json()
#     skill=skill['skills']
#     skills2=[]
#     for i in skills:
#         skills2.append(str(i))
#     l=[]
#     for i in range(len(skills2)):
#         l.append([textdistance.jaccard(skills2[i] , skill),i])
#     l=sorted(l, reverse=True)
#     rec_jobs_idx=l[0:10]
#     rec_jobs_list=[]
#     for i in rec_jobs_idx:
#         rec_jobs_list.append([new_df['jobtitle'][i[1]],new_df['skills'][i[1]]])
#     response=jsonify(rec_jobs_list)
#     response.headers.add('Access-Control-Allow-Origin', '*')
#     return response
    #return "hello"

if __name__=="__main__":
    app.run(debug=True)