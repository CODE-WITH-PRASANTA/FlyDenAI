import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";

export default function FormElements() {
  return (
    <div>
      <PageMeta
        title="FlyDenAi Admin | Add / Edit Form"
        description="Admin dashboard form section for managing FlyDenAi data"
      />
      <PageBreadcrumb pageTitle="Manage Form Data" />

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Add New Entry
        </h2>

        <form className="space-y-4">
          {/* Example field */}
          <div>
            <label className="block mb-2 text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter full name"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Email Address</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              maxLength={10}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">Upload Document</label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
