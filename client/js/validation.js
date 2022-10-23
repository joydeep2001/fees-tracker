    function ValidateForm() {
      this.isValid = false;
      this.schema = {
        name: {
          ref: name,
          type: "alpha-only",
          len: [5, 50]
          required: true
        },
        college: {
          ref: college,
          type: "alpha-only",
          len: [5, 100]
          required: true

        },
        sem: {
          ref: college,
          type: "number",
          range: [1, 2],
          required: true
        },
        feesMonth: {
          ref: feesMonth,
          type: "month",
          required: true
        },
        paymentMode: {
          ref: paymentMode,
          type: "string",
          required: true
        },
        mobile: {
          ref: mobile,
          type: "tel",
          required: true
        },
        gurdianMobile: {
          ref: gurdianMobile,
          type: "tel",
          required: true
        },
        screenshot: {
          ref: screenshot,
          type: "file",
          allowedFile: "jpg|jpeg|png",
          required: true
        }
      }
      this.validate = function() {
        console.log(this.schema)
        for(const inputField in this.schema) {
          for(const prop in this.schema[inputField]) {
            const value = ref.value;
            if(prop.type)
              validateType(value, prop);
            if(prop.required)
              validateRequired(value);
            if(prop.len)
              validateLen(value, prop);
            if(prop.range)
              validateRange(value, prop);
          }
        }
    }
    let validateRequired = function(value, prop) {
      if(value.trim().length >= 1) 
        return null;
      return "Required Field!";
    }
    let validateType = function(value, prop) {
      if(type === "alpha-only") {
        if(value.match(/[^a-zA-Z]/)) return "Only Alphabet allowed!";;
        return null;
      }
      if(type === "number") {
        if(value.match(/[^0-9]/)) return "Only numbers are allowed";
      } 
    }

}
