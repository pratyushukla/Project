import os
from flask import Flask, jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
from bs4 import BeautifulSoup
from selenium import webdriver
import csv 


app = Flask(__name__)
CORS(app)


load_dotenv()
skill_list=os.getenv('SKILL_LIST').split(",")


options=webdriver.ChromeOptions();
options.headless=True
options.add_argument('--lang=en_US') 
user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36'
options.add_argument('user-agent={0}'.format(user_agent))
driver = webdriver.Chrome(options=options)



def scrape():
    try:
        # field names 
        fields = ['job', 'link', 'company', 'experience', 'salary', 'location', 'skill'] 
        filename="job.csv"
        with open(filename, 'w',newline='', encoding='utf-8') as csvfile: 
            # creating a csv writer object 
            csvwriter = csv.writer(csvfile) 
                
            # writing the fields 
            csvwriter.writerow(fields) 
        
        # print(skill_list)
        # return
        for skill in skill_list:
            url="https://www.naukri.com/"+skill+"-jobs?experience=0"
            driver.get(url)
            driver.save_screenshot("scrape.png")
            soup = BeautifulSoup(driver.page_source,'html.parser')
            soup.prettify()

            data=soup.find_all(class_="jobTuple")
            jobs=[]
            for item in data:
                title=item.find(class_="title")
                company=item.find(class_="subTitle")
                try:
                    link=item.find(class_="title")["href"] 
                except:
                    link="#"
                exp=item.find(class_="experience")
                sal=item.find(class_="salary")
                loc=item.find(class_="location")
                skill=item.find(class_="has-description")
                temp=[]
                try:
                    temp.append(title.text.strip('\n'))
                    temp.append(link)
                    temp.append(company.text)
                    temp.append(exp.text)
                    temp.append(sal.text)
                    temp.append(loc.text)
                    s=""
                    for el in skill.find_all('li'):
                        s+=el.text+", "
                    temp.append(s)
                    jobs.append(temp)
                except:
                    pass
            filename="job.csv"
            with open(filename, 'a',newline='', encoding='utf-8') as csvfile: 
                # creating a csv writer object 
                csvwriter = csv.writer(csvfile) 
                    
                # writing the data rows 
                csvwriter.writerows(jobs)
    
    except Exception as e: 
        print(e)
        print("Scraping failed!")
        driver.close()

scrape()
print("Scraping done!")
driver.close()







import pandas as pd
import textdistance

new_df=pd.read_csv('job.csv')

skills=new_df['skill']


@app.route('/predict',methods=['POST','GET'])
def getJobs():
    print(request.get_json())
    skill=request.get_json()
    skill=skill['skills']
    skills2=[]
    for i in skills:
        skills2.append(str(i))
    l=[]
    for i in range(len(skills2)):
        l.append([textdistance.jaccard(skills2[i] , skill),i])
    l=sorted(l, reverse=True)
    # print(l)
    rec_jobs_idx=l[0:24]
    rec_jobs_list=[]
    for i in rec_jobs_idx:
        temp={}
        temp['title']=new_df['job'][i[1]]
        temp['link']=new_df['link'][i[1]]
        temp['skill']=new_df['skill'][i[1]]
        temp['company']=new_df['company'][i[1]]
        temp['experience']=new_df['experience'][i[1]]
        temp['location']=new_df['location'][i[1]]
        temp['salary']=new_df['salary'][i[1]]
        rec_jobs_list.append(temp)

    response=jsonify(rec_jobs_list)
    print(rec_jobs_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__=="__main__":
    app.run(debug=True)