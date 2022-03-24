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

---

## Code review steps

### As the original developer, I have

- [ ] Met the acceptance criteria, or will meet them in subsequent PRs or stories
  - ... <!-- link follow-up PRs/stories here -->
- [ ] Created new stories in Storybook if applicable
  - [ ] Checked that all Storybook accessibility checks are passing
- [ ] Created/modified automated unit tests in Jest
  - [ ] Including jest-axe checks when UI changes
- [ ] Created/modified automated E2E tests in Cypress
  - [ ] Including cypress-axe checks when UI changes
- Performed [a11y testing](https://github.com/trussworks/accessibility/blob/master/sample_a11y_testing_process.md):
  - [ ] Checked responsiveness in mobile, tablet, and desktop
  - [ ] Checked keyboard navigability
  - [ ] Tested with [VoiceOver](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts) in Safari
  - [ ] Checked VO's [rotor menu](https://github.com/trussworks/accessibility/blob/master/README.md#how-to-use-the-rotor-menu) for landmarks, page heading structure and links
  - [ ] Used a browser a11y tool to check for issues (WAVE, axe, ANDI or Accessibility addon tab for Storybook)
- [ ] Requested a design review for user-facing changes
- For any new migrations/schema changes:
  - [ ] Followed guidelines for zero-downtime deploys

### As code reviewer(s), I have

- [ ] Pulled this branch locally and tested it
- [ ] Reviewed this code and left comments
- [ ] Checked that all code is adequately covered by tests
- [ ] Made it clear which comments need to be addressed before this work is merged
- [ ] Considered marking this as accepted even if there are small changes needed
- Performed [a11y testing](https://github.com/trussworks/accessibility/blob/master/sample_a11y_testing_process.md):
  - [ ] Checked responsiveness in mobile, tablet, and desktop
  - [ ] Checked keyboard navigability
  - [ ] Tested with [VoiceOver](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts) in Safari
  - [ ] Checked VO's [rotor menu](https://github.com/trussworks/accessibility/blob/master/README.md#how-to-use-the-rotor-menu) for landmarks, page heading structure and links
  - [ ] Used a browser a11y tool to check for issues (WAVE, axe, ANDI or Accessibility addon tab for Storybook)

### As a designer reviewer, I have

- [ ] Checked in the design translated visually
- [ ] Checked behavior
- [ ] Checked different states (empty, one, some, error)
- [ ] Checked for landmarks, page heading structure, and links
- [ ] Tried to break the intended flow
- Performed [a11y testing](https://github.com/trussworks/accessibility/blob/master/sample_a11y_testing_process.md):
  - [ ] Checked responsiveness in mobile, tablet, and desktop
  - [ ] Checked keyboard navigability
  - [ ] Tested with [VoiceOver](https://dequeuniversity.com/screenreaders/voiceover-keyboard-shortcuts) in Safari
  - [ ] Checked VO's [rotor menu](https://github.com/trussworks/accessibility/blob/master/README.md#how-to-use-the-rotor-menu) for landmarks, page heading structure and links
  - [ ] Used a browser a11y tool to check for issues (WAVE, axe, ANDI or Accessibility addon tab for Storybook)

---

## Screenshots

<!-- If this PR makes visible interface changes, an image of the finished interface can help reviewers
and casual observers understand the context of the changes.
A before image is optional and can be included at the submitter's discretion.

Consider using an animated image to show an entire workflow.
You may want to use GIPHY CAPTURE for this! 📸

_Please frame images to show useful context but also highlight the affected regions._
--->
