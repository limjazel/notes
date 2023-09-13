# MyInteract Smart Forms

MyInteract uses smart forms to collate form submissions (eg. registration forms, surveys, voting polls) or send out custom forms (such as calculation results, quiz results). Smart forms are used in assets, which are then uploaded to SAM to be used by any myInteract user who has access to that asset.

## Setting up

Before you can start on anything, make sure you have access to the following:

- Test SAM access
- Mockup design of the asset (if there's any)
- PDF design

## How it works

Using itSam, you can pass the form field values from an asset to the smart form. The data will then be automatically transferred to a PDF, then a copy will be sent to the set recipient (usually the company who owns the asset or an MI admin).

## Uploading the Smart Form





## Somethign

**Note:** The object uses a specific format which can be seen under "surveys API" on the SAM API docs, specifically, the **_postSurveyResults._**

I have build a script that automatically converts the smart-form-fields.json into the proper payload format. 
Which I'll discuss more later.
