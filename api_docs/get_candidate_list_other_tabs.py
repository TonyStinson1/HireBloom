import requests
import json

url = "https://sourcerer-ai-staging.herokuapp.com/"
session_token = "r:91b99edb4963ca5dee57662583885c9d"
project_id = "60f62426008715ba00ea6e25"

# This script goes through how to the list of candidates to show in other screens, e.g. rejected, saved for later,
# or contacted.
#
# Make a GET call to the v1/candidates resource
# Include the session token in the headers
# The payload should include one of the following for the status field
# - "approved" (to populate Saved for Later tab)
# - "rejected" (to populate Rejected for Later tab)
# - "contacted" (to populate Contacted for Later tab)
#along with "project_id".
#
# All project_ids for the user are retrieved from get_projects example
#
# The return is a list of candidates.
# You can pick out the name/location from each candidate dictionary in the list for display

status = "rejected" #you can also replace "rejected" with "approved" and "contacted" in this call
payload = {"project_id": project_id,
           "status": status}
headers = {"X-Parse-Session-Token": session_token}

response = requests.get(url + "v1/candidates", params=payload, headers=headers)
response_json = response.json()
status_code = response.status_code

print('=========')
print(status_code) #If successful, the call will return a 200 status code
print('=========')
print('=========')
print(json.dumps(response_json, indent=4, sort_keys=True)) #This is just to format the dictionary for printing
print('=========')

#response json is a list of dictionaries
#the below syntax shows how to iterate
#through each dictionary in the response list and extract some values needed the mobile screens
for candidate in response_json:
    #for each candidate, print name, job title, location, rating,
    print(candidate['name'])
    print(candidate['location'])
    print(candidate['current_job_title'])
    print(candidate['score'])
    if status == 'rejected':
        rejection_reason_string = candidate['rejection_reason_formatted']
        print(rejection_reason_string)
    if status == 'contacted':
        contacted_date = candidate['contacted_date']
        print(contacted_date)
    print('=========')


