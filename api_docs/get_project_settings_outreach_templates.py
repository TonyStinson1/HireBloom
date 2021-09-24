import requests
import json

url = "https://sourcerer-ai-staging.herokuapp.com/"
session_token = "r:91b99edb4963ca5dee57662583885c9d"
project_id = "60f619fb2e42a8eea84526b9"

# This backend resource can be used to populate the outreach templates for a project
# It also returns a lot of other project related settings, but these are likely not needed
# on the mobile app
# Make a GET call to v1/projects/settings resource.
# pass in session token in the headers, and "project_id" in the params
payload = {"project_id": project_id}
headers = {"X-Parse-Session-Token": session_token}
response = requests.get(url + "v1/projects/settings", params=payload, headers=headers)
status_code = response.status_code
response_json = response.json()

print('=========')
print(status_code) #If successful, the call will return a 200 status code
print('=========')
print(json.dumps(response_json, indent=4, sort_keys=True)) #This is just to format the dictionary for printing
print('=========')
print("This is the template to fill in for the project")
print(response_json['initial_outreach_template'])
print('=========')
