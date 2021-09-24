import requests
import json

url = "https://sourcerer-ai-staging.herokuapp.com/"
session_token = "r:91b99edb4963ca5dee57662583885c9d"
project_id = "60f619fb2e42a8eea84526b9"

# This script goes through how to get a candidate card to show in the Under Review screen
# Make a GET call to the v1/candidates resource
# Include the session token in the headers
# The payload should include "under_review" for the status field, and "project_id"
# All project_ids for the user are retrieved from get_projects example
# The return is a list with 1 dictionary entry, which contains all the information to display
# (general, skills, education, recommendations, etc.)

payload = {"project_id": project_id,
           "status": "under_review"}
headers = {"X-Parse-Session-Token": session_token}

response = requests.get(url + "v1/candidates", params=payload, headers=headers)
print(response.url)

exit()
response_json = response.json()
status_code = response.status_code

print('=========')
print(status_code) #If successful, the call will return a 200 status code
print('=========')
print('=========')
print(json.dumps(response_json, indent=4, sort_keys=True)) #This is just to format the dictionary for printing
print('=========')




