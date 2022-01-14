from flask import Flask, jsonify,request
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
import pandas as pd
import textdistance
new_df=pd.read_csv('modified_data.csv')

skills=new_df['skills']


@app.route('/predict',methods=['POST','GET'])
def hello():
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
    rec_jobs_idx=l[0:10]
    rec_jobs_list=[]


    for i in rec_jobs_idx:
        rec_jobs_list.append([new_df['jobtitle'][i[1]],new_df['skills'][i[1]]])

    response=jsonify(rec_jobs_list)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response
    #return "hello"

if __name__=="__main__":
    app.run(debug=True)