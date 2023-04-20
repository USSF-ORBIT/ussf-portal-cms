# SC-###

<!--
    If applicable, insert the Shortcut story number in the markdown header above.
    The hyperlink will be filled in by GitHub magic ([autolink references](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/configuring-autolinks-to-reference-external-resources))
--->

## Proposed changes

<!-- description and/or list of proposed changes -->

---

<!--
    Please add/remove/edit any of the template below to fit the needs
    of this specific PR
--->

## Reviewer notes

<!--
    Is there anything you would like reviewers to give additional scrutiny?
--->

## Setup

<!--
    Add any steps or code to run in this section to help others run your code:

    ```sh
    echo "Code goes here"
    ```
--->

### Start the system
```sh
yarn services:up
yarn dev
cd ../ussf-portal-client
yarn dev
```

Login to the cms http://localhost:3001

---

## Code review steps

### As the original developer, I have

- [ ] Met the acceptance criteria
- [ ] Created new stories in Storybook if applicable
- [ ] Created/modified automated unit tests in Jest
- [ ] Created/modified automated [E2E tests](https://github.com/USSF-ORBIT/ussf-portal)
- [ ] Followed guidelines for zero-downtime deploys, if applicable
- [ ] Use [ANDI](https://www.ssa.gov/accessibility/andi/help/install.html) to check for basic a11y issues

### As a reviewer, I have

Check out our [How to review a pull request](https://github.com/USSF-ORBIT/ussf-portal/blob/main/docs/how-to/review-pull-request.md) document.

---

## Screenshots

<!-- If this PR makes visible interface changes, an image of the finished interface can help reviewers
and casual observers understand the context of the changes.
A before image is optional and can be included at the submitter's discretion.

Consider using an animated image to show an entire workflow.
You may want to use GIPHY CAPTURE for this! 📸

_Please frame images to show useful context but also highlight the affected regions._
--->
