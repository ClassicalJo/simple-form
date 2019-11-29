function isEmpty(input) {
    return input.length > 0 ? true : false
}

function isLettersOnly(input) {
    return /^[A-Z]+$/.test(input) ? true : false
}

function isAgentNumber(input) {
    return /^[0-9][0-9][0-9][0-9]$/.test(input) ? true : false
}

function isUnderCharacterLimit(input, limit) {
    return input.length < limit ? true : false
}

function isOver18YearsOld(input) {
    let inputArray = input.split('-')
    let birthDate = new Date(inputArray[0], Number(inputArray[1]) - 1, inputArray[2])
    let todayDate = new Date()
    let over18years = new Date(Number(todayDate.getFullYear()) - 18, todayDate.getMonth(), todayDate.getDate())
    return birthDate.getTime() <= over18years.getTime() ? true : false
}

function isValidEmail(input) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(input) ? true : false;
}

function validateNameField() {
    let $nameField = document.form["first-name"].value.trim().toUpperCase()
    if (!isEmpty($nameField)) { return "The name field cannot be empty." }
    else if (!isLettersOnly($nameField)) { return "The name field must only contain letters." }
    else if (!isUnderCharacterLimit($nameField, 35)) { return "The name field must contain less than 35 characters." }
    else { return "" }
}

function validateLastNameField() {
    let $lastNameField = document.form["last-name"].value.trim().toUpperCase()
    if (!isEmpty($lastNameField)) { return "The last name field cannot be empty" }
    else if (!isLettersOnly($lastNameField)) { return "The last name field must only contain letters." }
    else if (!isUnder35CharacterLimit($lastNameField)) { return "The last name field must contain less than 35 characters." }
    else { return "" }
}

function validateDateOfBirth() {
    let $dateOfBirthField = document.form.birthday.value
    if (!isEmpty($dateOfBirthField)) { return "The date of birth field must contain a valid date." }
    else if (!isOver18YearsOld($dateOfBirthField)) { return "You must be at least eighteen years old to apply to the partner program." }
    else { return "" }
}

function validateEmail() {
    let $email = document.form.email.value.trim()
    if (!isEmpty($email)) { return "The e-mail field cannot be empty." }
    else if (!isValidEmail($email)) { return "The e-mail field must contain a valid e-mail" }
    else { return "" }
}

function validateConfirmEmail() {
    let $email = document.form.email.value.trim()
    let $confirmEmail = document.form["confirm-email"].value.trim()
    if (!isEmpty($confirmEmail)) { return "The confirm e-mail field cannot be empty." }
    else if ($email !== $confirmEmail) { return "The e-mail field and the confirm e-mail field must be identical." }
    else { return "" }
}

function validateNationality() {
    let $nationality = document.form.nationality.value
    if (!isEmpty($nationality)) { return "The nationality field cannot be empty." }
    else { return "" }
}

function validateAgentNumber() {
    let $agentNumber = document.form["agent-number"].value.trim()
    if (!isEmpty($agentNumber)) { return "The agent number field cannot be empty." }
    else if (!isAgentNumber($agentNumber)) { return "The agent number field must contain your four digit agent number." }
    else { return "" }
}

function validateBoostingAUBranch() {
    let $branch = document.form.branch.value
    if (!isEmpty($branch)) { return "The branch field cannot be empty." }
    else { return "" }
}

function validateReason() {
    let $reason = document.form.reason.value.trim()
    if (!isUnderCharacterLimit($reason, 200)) { return "The reason field must contain less than two hundred words." }
    else { return "" }
}

function validateRisk() {
    let $risk = document.form.risk.checked
    if ($risk !== true) { return "You must confirm your awareness of possible risks in order to apply to the partner program." }
    else { return "" }
}

function validateWill() {
    let $will = document.form.will.checked
    if ($will !== true) { return "You must confirm your voluntary freedom in order to apply to the partner program." }
    else { return "" }
}

function handleErrors() {
    let errorCount = 0
    let errors = {
        'first-name': validateNameField(),
        'last-name': validateLastNameField(),
        "birthday": validateDateOfBirth(),
        "email": validateEmail(),
        "confirm-email": validateConfirmEmail(),
        "nationality": validateNationality(),
        "agent-number": validateAgentNumber(),
        "branch": validateBoostingAUBranch(),
        "reason": validateReason(),
        "risk": validateRisk(),
        "will": validateWill(),
    }
    let $errors = document.querySelector("#errors")
    $errors.innerHTML = ""
    let $ul = document.createElement("ul")

    Object.keys(errors).forEach((key) => {
        if (errors[key].length > 0) {
            errorCount++
            document.querySelector(`[name=${key}]`).setAttribute("style", "border: 2px solid red")
            let $li = document.createElement("li")
            $li.textContent = errors[key]
            $ul.appendChild($li)
        }
        else { document.querySelector(`[name=${key}]`).removeAttribute("style") }
    })

    if ($ul.hasChildNodes() === true) {
        let $p = document.createElement("p")
        $p.textContent = 'The following errors appeared while processing your application:'

        let $errorContainer = document.createElement("div")
        $errorContainer.classList.add("error-list")

        $errorContainer.appendChild($p)
        $errorContainer.appendChild($ul)
        $errors.appendChild($errorContainer)
    }
}

function handleClick(event) {
    handleErrors()
    event.preventDefault()
}

let handleClear = function () {
    $allInput = document.querySelectorAll(".input-field")
    for (let i = 0; i < $allInput.length; i++) {
        $allInput[i].value = ''
    }
    $allCheckboxes = document.querySelectorAll("input[type=checkbox]")
    for (let i = 0; i < $allCheckboxes.length; i++) {
        $allCheckboxes[i].checked = false
    }
}