import requests
import json

url = "https://sourcerer-ai-staging.herokuapp.com/"
session_token = "r:91b99edb4963ca5dee57662583885c9d"

# This script goes through how to get some user settings,
# like user's name, email, etc. which are used in various places
# through the app

# Make a GET call to v1/users/settings, including the session token.
# You only need to pass in the session_token into the headers
headers = {"X-Parse-Session-Token": session_token}
response = requests.get(url + "v1/users/settings", headers=headers)
status_code = response.status_code
print(response.text)
print(response.status_code)
response_json = response.json()

print('=========')
print(status_code) #If successful, the call will return a 200 status code
print('=========')
print('=========')
print(json.dumps(response_json, indent=4, sort_keys=True)) #This is just to format the dictionary for printing
print('=========')
print("User id:" + str(response_json["id"]))
print("User first name:" + str(response_json["first_name"]))
print("User last name:" + str(response_json["last_name"]))
print("User email:" + str(response_json["email"]))
print("User's profile picture URL: " + str(response_json["profile_picture"]))
print('=========')

