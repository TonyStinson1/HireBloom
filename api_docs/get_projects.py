#This backend resource can be used to populate the list of projects in the main dashboard.

#It also returns the counts for the various statuses (Contacted, Review, etc.) which
# need to be populated in the main naviation window.

url = "https://sourcerer-ai-staging.herokuapp.com/"

import requests
import json

session_token = "r:91b99edb4963ca5dee57662583885c9d"

headers = {"X-Parse-Session-Token": session_token}
response = requests.get(url+"v1/projects", headers=headers) #There is no body for this call, just header
status_code = response.status_code

response_json = response.json()

# file_name = open('test.json', mode='w')
print('=========')
print(response.status_code)
print('=========')
# json.dump(response_json, file_name, indent=4)
print(json.dumps(response_json, indent=4, sort_keys=True))
print('=========')

# Extract the counts and all other fields that you need for the dashboard screen
# and the navigation dropdown screen
for project_dictionary in response_json:
    print("Project name: "+ str(project_dictionary["project_name"]))
    print("Is owner: "+ str(project_dictionary["is_owner"])) # This is also needed for mobile dashboard, True=your projects, False = shared with you
    print("Is autopilot: "+ str(project_dictionary["in_auto_swipe_mode"])) # These projects should have the airplane designation in main dashboard
    print("Review count: "+ str(project_dictionary["candidates_review_count"])) # This is the number next to Review for that project in main navigation
    print("Reject count: "+ str(project_dictionary["candidates_rejected_count"])) # This is the number next to Reject for that project in main navigation
    print("Saved for Later count: "+ str(project_dictionary["candidates_approved_count"])) # This is the number next to Savd for Later for that project in main navigation
    print("Contacted count: "+ str(project_dictionary["candidates_contacted_count"])) # This is the number next to Contacted for that project in main navigation
    print('=========')
