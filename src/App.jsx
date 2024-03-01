import "./App.css";
import { useFormik } from "formik";
import { Select, Option, Textarea, Alert } from "@material-tailwind/react";
import { InputWithDropdown } from "./components/InputWithDropDown";
import DatePickerCustom from "./components/DatePickerCustom";
import emailjs from "@emailjs/browser";

function App() {
  const formik = useFormik({
    initialValues: {
      businessOwnerDetails: {
        citizenship: "",
        phoneNumber: "",
        email: "",
        province: "",
      },
      businessDetails: {
        businessType: "",
        companyName: "",
        tinNumber: "",
        registrationDate: "",
        province: "",
      },
      productInformation: {
        purposeOfImportation: "",
        productCategory: "",
        weight: "",
        unitOfMeasurement: "",
        quantity: "",
        productDescription: "",
      },
    },
    onSubmit: (values) => {
    
      emailjs
        .send(
          "service_wvftloa",
          "template_0v5fy2e",
          {
            from_name: "Ali Ntagungira",
            to_name: "P. Touko",
            from_email: values.businessOwnerDetails.email,
            to_email: "ntagungiraali@gmail.com",
            message: JSON.stringify(values, null, 2),
          },
          "hzIvTRJL-tYcSA65K"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Email sent successfully")
          },
          (error) => {
            console.log(error.text);
            alert("Email failed to send")
          }
        );
    },
  });

  return (
    <div className="w-full items-center">
      <div className="w-[100%] items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col w-[80%] p-3 mx-auto"
        >
          {/* Business Owner Details */}
          <div className="border-2 border-black rounded-md mt-5 w-full">
            <div className="w-[100%] bg-blue-100 p-3 ">
              <p className="text-blue-700 font-bold">Business Owner Details</p>
            </div>
            <div className="mt-4 w-[100%] p-4">
              <div className="text-black font-semibold mb-3">
                <p>Business Owner Details</p>
              </div>
              <div className="w-[25%]">
                <label className="font-[15] text-gray-800 mb-3">
                  Applicant Citizenship<span className="text-red-800">*</span>
                </label>
                <Select
                  placeholder="Applicant Citizenship"
                  label="Select Citizenship"
                  value={formik.values.businessOwnerDetails.citizenship}
                  onChange={(value) =>
                    formik.setFieldValue(
                      "businessOwnerDetails.citizenship",
                      value
                    )
                  }
                  aria-required
                >
                  <Option value="Rwandan">Rwandan</Option>
                  <Option value="Foreigner">Foreigner</Option>
                </Select>
              </div>
              <div className="flex flex-row mt-4">
                <div className="w-[25%] mr-2">
                  <label className="font-[15] text-gray-800 mb-3">
                    Phone Number<span className="text-red-800">*</span>
                  </label>
                  <InputWithDropdown
                    onChange={(value) =>
                      formik.setFieldValue(
                        "businessOwnerDetails.phoneNumber",
                        value
                      )
                    }
                  />
                </div>
                <div className="w-[25%]">
                  <label className="font-[15] text-gray-800 mb-3">
                    Email<span className="text-red-800">*</span>
                  </label>
                  <input
                    type="email"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="email"
                    name="businessOwnerDetails.email"
                    placeholder="Enter an email address"
                    onChange={formik.handleChange}
                    value={formik.values.businessOwnerDetails.email}
                  />
                </div>
              </div>
              <div className="text-black font-semibold my-4">
                <p>Business Owner Address</p>
              </div>
              <div className="w-[25%]">
                <label className="font-[15] text-gray-800 mb-3">
                  Province<span className="text-red-800">*</span>
                </label>
                <Select
                  placeholder="Select Province"
                  label="Select Province"
                  value={formik.values.businessOwnerDetails.province}
                  onChange={(value) =>
                    formik.setFieldValue("businessOwnerDetails.province", value)
                  }
                  aria-required
                >
                  <Option value="Southern">Southern</Option>
                  <Option value="Eastern">Eastern</Option>
                  <Option value="Western">Western</Option>
                  <Option value="Northern">Northern</Option>
                  <Option value="Kigali">Kigali City</Option>
                </Select>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="border-2 border-black rounded-md mt-5">
            <div className="w-[100%] bg-blue-100 p-3 ">
              <p className="text-blue-700 font-bold">Business Details</p>
            </div>
            <div className="mt-4 w-[100%] p-4">
              <div className="text-black font-semibold mb-3">
                <p>Business Details</p>
              </div>
              <div className="flex flex-row mt-4">
                <div className="w-[25%] mr-2">
                  <label className="font-[15] mb-3 text-gray-800">
                    Business Type<span className="text-red-800">*</span>
                  </label>
                  <Select
                    label="Select Business type"
                    aria-required
                    onChange={(value) =>
                      formik.setFieldValue(
                        "businessDetails.businessType",
                        value
                      )
                    }
                  >
                    <Option value="Retailer">Retailer</Option>
                    <Option value="Whole sale">Whole sale</Option>
                    <Option value="Manufacturer">Manufacturer</Option>
                  </Select>
                </div>
                <div className="w-[25%]">
                  <label className="font-[15] mb-3 text-gray-800">
                    Company Name<span className="text-red-800">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="text"
                    name="businessDetails.companyName"
                    placeholder="Enter company name"
                    onChange={formik.handleChange}
                    value={formik.values.businessDetails.companyName}
                  />
                </div>
              </div>
              <div className="flex flex-row mt-4">
                <div className="w-[25%] mr-2">
                  <label className="font-[15] mb-3 text-gray-800">
                    Tin Number<span className="text-red-800">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="tin"
                    name="businessDetails.tinNumber"
                    placeholder="Enter Tin Number"
                    onChange={formik.handleChange}
                    value={formik.values.businessDetails.tinNumber}
                  />
                </div>
                <div className="w-[25%]">
                  <label className="font-[15] mb-3 text-gray-800">
                    Registration Date<span className="text-red-800">*</span>
                  </label>
                  <DatePickerCustom
                    onChange={(date) =>
                      formik.setFieldValue(
                        "businessDetails.registrationDate",
                        date
                      )
                    }
                  />
                </div>
              </div>
              <div className="text-black font-semibold my-4">
                <p>Business Address</p>
              </div>
              <div className="w-[25%]">
                <label className="font-[15] mb-3 text-gray-800">
                  Province<span className="text-red-800">*</span>
                </label>
                <Select
                  label="Select Province"
                  aria-required
                  onChange={(value) =>
                    formik.setFieldValue("businessDetails.province", value)
                  }
                >
                  <Option value="Southern">Southern</Option>
                  <Option value="Eastern">Eastern</Option>
                  <Option value="Western">Western</Option>
                  <Option value="Northern">Northern</Option>
                  <Option value="Kigali">Kigali City</Option>
                </Select>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="border-2 border-black rounded-md mt-5">
            <div className="w-[100%] bg-blue-100 p-3 ">
              <p className="text-blue-700 font-bold">Product Information</p>
            </div>
            <div className="mt-4 w-[100%] p-4">
              <div className="text-black font-semibold mb-3">
                <p>Importation Details</p>
              </div>
              <div className="w-[25%]">
                <label className="font-[15] text-gray-800 mb-3">
                  Purpose of Importation
                  <span className="text-red-800">*</span>
                </label>
                <Select
                  placeholder="Purpose of Importation"
                  label="Purpose of Importation"
                  aria-required
                  onChange={(value) =>
                    formik.setFieldValue(
                      "productInformation.purposeOfImportation",
                      value
                    )
                  }
                >
                  <Option value="Direct Sale">Direct Sale</Option>
                  <Option value="Personal Use">Personal Use</Option>
                  <Option value="Trial Use">Trial Use</Option>
                </Select>
              </div>
              <div className="text-black font-semibold my-4">
                <p>Product Details</p>
              </div>
              <div className="w-[25%]">
                <label className="font-[15] text-gray-800 mb-3">
                  Product Category
                  <span className="text-red-800">*</span>
                </label>
                <Select
                  placeholder="Select product category"
                  label="Select product category"
                  aria-required
                  onChange={(value) =>
                    formik.setFieldValue(
                      "productInformation.productCategory",
                      value
                    )
                  }
                >
                  <Option value="Direct Sale">Direct Sale</Option>
                  <Option value="Personal Use">Personal Use</Option>
                  <Option value="Trial Use">Trial Use</Option>
                </Select>
              </div>
              <div className="w-[25%] mr-2 mt-3">
                <label className="font-[15] mb-3 text-gray-800">
                  Weight [kg]<span className="text-red-800">*</span>
                </label>
                <input
                  type="number"
                  className="w-full border border-gray-400 rounded-md p-2"
                  id="weight"
                  name="productInformation.weight"
                  placeholder="Enter Weight in Kg"
                  onChange={formik.handleChange}
                  value={formik.values.productInformation.weight}
                />
              </div>
              <div className="flex flex-row mt-4">
                <div className="w-[25%] mr-2">
                  <label className="font-[15] mb-3 text-gray-800">
                    Unit of Measurement<span className="text-red-800">*</span>
                  </label>
                  <Select
                    placeholder="Select unit of importation"
                    label="Select unit of measurement"
                    aria-required
                    onChange={(value) =>
                      formik.setFieldValue(
                        "productInformation.unitOfMeasurement",
                        value
                      )
                    }
                  >
                    <Option value="Kgs">Kgs</Option>
                    <Option value="Tones">Tones</Option>
                  </Select>
                </div>
                <div className="w-[25%]">
                  <label className="font-[15] mb-3 text-gray-800">
                    Quantity of product<span className="text-red-800">*</span>
                  </label>
                  <input
                    type="number"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="quantity"
                    name="productInformation.quantity"
                    placeholder="Quantity of product"
                    onChange={formik.handleChange}
                    value={formik.values.productInformation.quantity}
                  />
                </div>
              </div>
              <div className="w-[50%] mt-2">
                <label className="font-[15] mb-3 text-gray-800">
                  Product Description<span className="text-red-800">*</span>
                </label>
                <Textarea
                  label="Enter product description"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "productInformation.productDescription",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="bg-blue-500 text-white p-2 mt-5 hover:bg-blue-300">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
