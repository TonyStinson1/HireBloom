import requests

url = "https://sourcerer-ai-staging.herokuapp.com/"
session_token = "r:91b99edb4963ca5dee57662583885c9d"
candidate_id = "60f619fb2e42a8eea84526b9"

# This script goes through how to approve (saved for later)
# or reject a candidate card from the Under Review screen.
# These are the bottom 2 buttons (except mail) on the Under Review screen.
#
# Make a PUT call to the v1/candidates resource
# Include the session token in the headers
# The payload should include "approved" for the status field, and "candidate_id"
#
# If successful, the call returns a 200 status code. You can retrieve the next candidate with
# another GET call. If you moved candidate to approve or rejected, when you use the script to
# get_candidate_list_other_tabs, you should see that candidate there.

# The candidate_id is available in the candidate dictionary retrived form the GET v1/candidates
# call that you made to populate the card. This example script just moves 1 candidate
# around from under review to approved to rejected, so you can see the call signature.

# At start of script, candidate is in the "under_review" status
candidate_id = "61421bb72dfa298e7d7cf38b" #this candidate is in project "60f62426008715ba00ea6e25"

# moving a candidate to "approved" status (to be called when user presses the
# right side button on the under_review tab)
payload = {"candidate_id": candidate_id, "status": "approved"}
headers = {"X-Parse-Session-Token": session_token}
response = requests.put(url + "v1/candidates", params=payload, headers=headers)
status_code = response.status_code
print('=========')
print("Reponse for moving to approved:")
print(status_code) #If successful, the call will return a 200 status code
print('=========')

# moving a candidate to "rejected" status (to be called when user presses the
# left side button on the under_review tab)
# Moving to "rejected" status has additional fields that need to be passed in
# to indicate the reasons for rejection that the user inputted.
# These reasons are passed into the payload as a list of rejection codes, e.g. "rejection_code": [1, 4, 13].
# The mapping of rejection reasons to rejection codes are:
#     JOB_TITLE_NOT_MATCHED = 1
#     NOT_IN_DESIRED_LOCATION = 2
#     NOT_ENOUGH_EXPERIENCE = 3
#     COMPANIES_NOT_MATCHED = 4
#     CANDIDATE_OVERQUALIFIED = 5
#     DIVERSITY_PROFILE_NOT_MATCHED = 6
#     RESPONSE_PROB_LOW = 7
#     NOT_PRESTIGIOUS_SCHOOL = 8
#     EDUCATION_NOT_HIGH = 9
#     SKILLS_NOT_MATCHED = 10
#     OTHER = 11
#     ALREADY_CONTACTED = 12
#     DONT_LIKE_CURRENT_COMPANY = 13
#     VISA = 14
# Please ask if you have some confusion about which frontend string maps to which rejection code
#
# If the user checks "other" there is a freeform text field to type some reason
# This string would be passed into the call in the field "rejection_reason_other" as a string.
# It is optional and should only be send if the user selects "other" as the rejection reason.

#Example if user does NOT provide other as rejection reason
rejection_code = [7, 12]
payload = {"candidate_id": candidate_id, "status": "rejected", "rejection_code": rejection_code}
headers = {"X-Parse-Session-Token": session_token}
response = requests.put(url + "v1/candidates", params=payload, headers=headers)
status_code = response.status_code
print('=========')
print("Reponse for moving to rejected, no other:")
print(status_code) #If successful, the call will return a 200 status code
print('=========')

# Example if user provides other as the rejection reason (status code 11).
# In this case, rejection_reason_other needs to be provided as a string.
rejection_code = [7, 11, 12]
rejection_reason_other = "Rejecting for testing purposes"
payload = {"candidate_id": candidate_id,
           "status": "rejected",
           "rejection_code": rejection_code,
           "rejection_reason_other": rejection_reason_other}
headers = {"X-Parse-Session-Token": session_token}
response = requests.put(url + "v1/candidates", params=payload, headers=headers)
status_code = response.status_code
print('=========')
print("Reponse for moving to rejected with other:")
print(status_code) #If successful, the call will return a 200 status code
print('=========')


# move the candidate back into to "under_review" status.
# Note - this is only to reset the script so it starts at known state.
# There is no user-exposed action in the mobile app to do this
payload = {"candidate_id": candidate_id, "status": "under_review"}
headers = {"X-Parse-Session-Token": session_token}
response = requests.put(url + "v1/candidates", params=payload, headers=headers)
status_code = response.status_code
print('=========')
print("Reponse for moving back to under review:")
print(status_code) #If successful, the call will return a 200 status code
print('=========')