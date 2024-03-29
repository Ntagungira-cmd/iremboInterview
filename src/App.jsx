import "./App.css";
import { useFormik } from "formik";
import { Select, Option, Textarea } from "@material-tailwind/react";
import { InputWithDropdown } from "./components/InputWithDropDown";
import DatePickerCustom from "./components/DatePickerCustom";
import emailjs from "@emailjs/browser";
import * as Yup from "yup";

function App() {
  const validationSchema = Yup.object({
    businessOwnerDetails: Yup.object({
      citizenship: Yup.string().required("Citizenship is required"),
      phoneNumber: Yup.string(),
      email: Yup.string().email("Invalid email").required("Email is required"),
      province: Yup.string().required("Province is required"),
      nationalId: Yup.string(),
      passport: Yup.string(),
      otherNames: Yup.string().required("Other Names is required"),
      surname: Yup.string().required("Surname is required"),
      nationality: Yup.string().required("Nationality is required"),
    }),
    businessDetails: Yup.object({
      businessType: Yup.string().required("Business Type is required"),
      companyName: Yup.string().required("Company Name is required"),
      tinNumber: Yup.number().required("Tin Number is required"),
      registrationDate: Yup.string(),
      province: Yup.string().required("Province is required"),
    }),
    productInformation: Yup.object({
      purposeOfImportation: Yup.string().required(
        "Purpose of Importation is required"
      ),
      productCategory: Yup.string().required("Product Category is required"),
      weight: Yup.string().required("Weight is required"),
      unitOfMeasurement: Yup.string().required(
        "Unit of Measurement is required"
      ),
      quantity: Yup.string().required("Quantity is required"),
      productDescription: Yup.string().required(
        "Product Description is required"
      ),
    }),
  });

  const formik = useFormik({
    initialValues: {
      businessOwnerDetails: {
        citizenship: "",
        phoneNumber: "",
        email: "",
        province: "",
        nationalId: "",
        passport: "",
        otherNames: "",
        surname: "",
        nationality: "",
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
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      emailjs
        .send(
          "service_wvftloa",
          "template_6ie1cxf",
          {
            from_name: "Ali Ntagungira",
            to_name:
              values.businessOwnerDetails.otherNames +
              " " +
              values.businessOwnerDetails.surname,
            message: JSON.stringify(values, null, 2),
            to_email: values.businessOwnerDetails.email,
          },
          "hzIvTRJL-tYcSA65K"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Email sent successfully");
          },
          (error) => {
            console.log(error.text);
            alert("Email failed to send");
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
            <div className="w-[100%] bg-blue-100 p-3 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <p className="text-blue-700 font-bold">Business Owner Details</p>
            </div>
            <div className="text-black font-semibold p-4">
              <p>Business Owner Details</p>
            </div>
            <div className="mt-3 w-[100%] p-4 mr-1">
              <div className="flex flex-row">
                <div className="w-[29%]">
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
                  {formik.touched.businessOwnerDetails?.citizenship &&
                    formik.errors.businessOwnerDetails?.citizenship && (
                      <span className="text-red-600">
                        {formik.errors.businessOwnerDetails.citizenship}
                      </span>
                    )}
                  {formik.values.businessOwnerDetails.citizenship ===
                    "Rwandan" && (
                    <div className="w-[100%] mt-3">
                      <label className="font-[15] text-gray-800 mb-3">
                        National ID<span className="text-red-800">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-400 rounded-md p-2"
                        id="nationalId"
                        name="businessOwnerDetails.nationalId"
                        placeholder="Enter National ID"
                        onChange={formik.handleChange}
                        value={formik.values.businessOwnerDetails.nationalId}
                      />
                      {formik.touched.businessOwnerDetails?.nationalId &&
                        formik.errors.businessOwnerDetails?.nationalId && (
                          <span className="text-red-600">
                            {formik.errors.businessOwnerDetails.nationalId}
                          </span>
                        )}
                    </div>
                  )}
                  {formik.values.businessOwnerDetails.citizenship ===
                    "Foreigner" && (
                    <div className="w-[100%] mt-3">
                      <label className="font-[15] text-gray-800 mb-3">
                        Passport Number<span className="text-red-800">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full border border-gray-400 rounded-md p-2"
                        id="passport"
                        name="businessOwnerDetails.passport"
                        placeholder="Enter Passport Number"
                        onChange={formik.handleChange}
                        value={formik.values.businessOwnerDetails.passport}
                      />
                      {formik.touched.businessOwnerDetails?.passport &&
                        formik.errors.businessOwnerDetails?.passport && (
                          <span className="text-red-600">
                            {formik.errors.businessOwnerDetails.passport}
                          </span>
                        )}
                    </div>
                  )}
                </div>
                {/* Nationality input field */}
                <div className="w-[25%] ml-5">
                  <label className="font-[15] text-gray-800 mb-3">
                    Nationality <span className="text-red-800">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="nationality"
                    name="businessOwnerDetails.nationality"
                    placeholder="Enter Nationality"
                    onChange={formik.handleChange}
                    value={formik.values.businessOwnerDetails.nationality}
                  />
                  {formik.touched.businessOwnerDetails?.nationality &&
                    formik.errors.businessOwnerDetails?.nationality && (
                      <span className="text-red-600">
                        {formik.errors.businessOwnerDetails.nationality}
                      </span>
                    )}
                </div>
              </div>
              <div className="flex flex-row mt-4 ml-0 p-0">
                <div className="w-[29%] mr-2">
                  <label className="font-[15] text-gray-800 mb-3">
                    Other Names<span className="text-red-800">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="otherNames"
                    name="businessOwnerDetails.otherNames"
                    placeholder="Enter an email address"
                    onChange={formik.handleChange}
                    value={formik.values.businessOwnerDetails.otherNames}
                  />
                  {formik.touched.businessOwnerDetails?.otherNames &&
                    formik.errors.businessOwnerDetails?.otherNames && (
                      <span className="text-red-600">
                        {formik.errors.businessOwnerDetails.otherNames}
                      </span>
                    )}
                </div>
                <div className="w-[25%] ml-3">
                  <label className="font-[15] text-gray-800 mb-3">
                    surname<span className="text-red-800">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-400 rounded-md p-2"
                    id="surname"
                    name="businessOwnerDetails.surname"
                    placeholder="Enter an email address"
                    onChange={formik.handleChange}
                    value={formik.values.businessOwnerDetails.surname}
                  />
                  {formik.touched.businessOwnerDetails?.surname &&
                    formik.errors.businessOwnerDetails?.surname && (
                      <span className="text-red-600">
                        {formik.errors.businessOwnerDetails.surname}
                      </span>
                    )}
                </div>
              </div>
              <div className="flex flex-row justify-self-start w-full mt-4">
                <div className="w-[30%]">
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
                <div className="w-[25%] ml-3">
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
                  {formik.touched.businessOwnerDetails?.email &&
                    formik.errors.businessOwnerDetails?.email && (
                      <span className="text-red-600">
                        {formik.errors.businessOwnerDetails.email}
                      </span>
                    )}
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
                {formik.touched.businessOwnerDetails?.province &&
                  formik.errors.businessOwnerDetails?.province && (
                    <span className="text-red-600">
                      {formik.errors.businessOwnerDetails.province}
                    </span>
                  )}
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="border-2 border-black rounded-md mt-5">
            <div className="w-[100%] bg-blue-100 p-3 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
              <p className="text-blue-700 font-bold">Business Details</p>
            </div>
            <div className="mt-4 w-[100%] p-4">
              <div className="w-[100%] text-black font-semibold">
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
                  {formik.touched.businessDetails?.businessType &&
                    formik.errors.businessDetails?.businessType && (
                      <span className="text-red-600">
                        {formik.errors.businessDetails.businessType}
                      </span>
                    )}
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
            <div className="w-[100%] bg-blue-100 p-3 flex flex-row">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-blue-700"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                />
              </svg>
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
                  <Option value="Direct Sale">General purpose</Option>
                  <Option value="Personal Use"> Construction materials</Option>
                  <Option value="Trial Use">Chemicals</Option>
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
          <input
            type="submit"
            value={"Submit"}
            className="bg-blue-500 text-white p-2 mt-5 hover:bg-blue-300"
          />
        
        </form>
      </div>
    </div>
  );
}

export default App;
