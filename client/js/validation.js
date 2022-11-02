function ValidateForm() {
  this.isValid = true;
  this.schema = {
    studentName: {
      ref: studentName,
      type: "alpha-only",
      len: [5, 50],
      required: true,
      error: null,
    },
    college: {
      ref: college,
      type: "string",
      len: [3, 100],
      required: true,
      error: null,
    },
    sem: {
      ref: sem,
      type: "number",
      range: [1, 10],
      required: true,
      error: null,
    },
    feesMonth: {
      ref: feesMonth,
      type: "month",
      required: true,
      error: null,
    },
    paymentMode: {
      ref: paymentMode,
      type: "string",
      required: true,
      error: null,
    },
    mobile: {
      ref: mobile,
      type: "tel",
      required: true,
      error: null,
    },
    gurdianMobile: {
      ref: gurdianMobile,
      type: "tel",
      required: true,
      error: null,
    },
    screenshot: {
      ref: screenshot,
      type: "file",
      allowedFile: "jpg|jpeg|png",
      required: true,
      error: null,
    },
  };

  this.validate = function () {
    console.log(this.schema);

    for (const inputField in this.schema) {
      const value = this.schema[inputField].ref.value;
      //console.log(this.schema[inputField]);
      this.schema[inputField].error = { exists: false };
      for (const prop in this.schema[inputField]) {
        if (prop === "type")
          this.schema[inputField].error.type = validateType(
            this.schema[inputField].type,
            value
          );
        if (prop === "required")
          this.schema[inputField].error.required = validateRequired(
            this.schema[inputField].required,
            value
          );
        if (prop === "len")
          this.schema[inputField].error.len = validateLen(
            this.schema[inputField].len,
            value
          );
        if (prop === "range")
          this.schema[inputField].error.range = validateRange(
            this.schema[inputField].range,
            value
          );
      }
      if (
        this.schema[inputField].error.type ||
        this.schema[inputField].error.required ||
        this.schema[inputField].error.len ||
        this.schema[inputField].error.range
      ) {
        this.schema[inputField].error.exists = true;
      }
      //console.log(this.schema[inputField]);

      this.isValid = !this.schema[inputField].error.exists && this.isValid;
    }
  };
  let validateRange = function ([upper, lower], value) {
    if (value >= upper && value <= lower) return null;
    return `The value should be between ${upper} and ${lower}`;
  };
  let validateLen = function ([min, max], value) {
    if (value.toString().length >= min && value.toString().length <= max)
      return null;
    return `The length must be between ${min} and ${max}`;
  };
  let validateRequired = function (isRequired, value) {
    if (!isRequired) return null;
    if (value.trim().length >= 1) return null;
    return "Required Field!";
  };
  let validateType = function (type, value) {
    if (type === "alpha-only") {
      if (value.match(/[^a-zA-Z\s]/)) return "Only Alphabet allowed!";
      return null;
    }
    if (type === "number") {
      if (value.match(/[^0-9]/)) return "Only numbers are allowed";
      return null;
    }
    if (type === "tel") {
      if (value.toString().length != 10 || value.match(/[^0-9]/))
        return "Please enter a valid number";
      return null;
    }
    //todo: add proper validations
    if (type === "month") return null;
    if (type === "string") return null;
    if (type === "file") return null;
  };
  this.showErrors = function () {
    console.clear();

    for (const inputField in this.schema) {
      const field = this.schema[inputField];
      const feedback = document.querySelector(`#${field.ref.id}-fb`);
      console.log(inputField, field.error);
      if (!field.error.exists) {
        feedback.innerHTML = "Looks good!";
        field.ref.classList.remove("is-invalid");
        field.ref.classList.add("is-valid");
      } else {
        field.ref.focus();
        const errorList = document.createElement("ul");
        feedback.innerHTML = "";
        for (const key in field.error) {
          if (key === "exists") continue;
          if (field.error[key] === null) continue;
          const item = document.createElement("li");
          item.innerHTML = field.error[key];
          errorList.appendChild(item);
        }
        feedback.appendChild(errorList);
        field.ref.classList.add("is-invalid");
        field.ref.classList.remove("is-valid");
      }
    }
  };
}
