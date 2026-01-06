import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

/* ================= Warehouse Data ================= */
const warehouses = [
  {
    id: 1,
    region: "Dhaka",
    district: "Dhaka North",
    centerName: "Dhaka North Hub",
  },
  {
    id: 2,
    region: "Dhaka",
    district: "Dhaka South",
    centerName: "Dhaka South Hub",
  },
  {
    id: 3,
    region: "Chattogram",
    district: "Chattogram City",
    centerName: "Chattogram Hub",
  },
  {
    id: 4,
    region: "Sylhet",
    district: "Sylhet City",
    centerName: "Sylhet Hub",
  },
];

const regions = [...new Set(warehouses.map((w) => w.region))];

const SendParcel = ({ user }) => {
  const { register, handleSubmit, watch, reset } = useForm();

  const parcelType = watch("type");
  const weight = watch("weight") || 0;
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");

  const calculateCost = (data) => {
    let base = data.type === "document" ? 100 : 150;
    let weightCost = data.type === "non-document" ? weight * 20 : 0;
    return base + weightCost + 50;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    console.log(data);

    toast.custom((t) => (
      <div className="space-y-3">
        <p className="font-semibold">
          Delivery Cost: <span className="text-primary">৳{cost}</span>
        </p>
        <div className="flex gap-2">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => {
              console.log({
                ...data,
                cost,
                creation_date: new Date().toISOString(),
              });
              toast.dismiss(t.id);
              toast.success("Parcel added successfully");
              reset();
            }}
          >
            Confirm
          </button>
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => toast.dismiss(t.id)}
          >
            Cancel
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold">Add Parcel</h2>
      <p className="text-gray-500 mb-6">
        Door to Door delivery requires both pickup and delivery information
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* ================= Parcel Info ================= */}
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>

          <div className="grid md:grid-cols-3 gap-4">
            {/* Parcel Type */}
            <select
              className="select select-bordered"
              {...register("type", { required: true })}
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            {/* Parcel Name */}
            <input
              type="text"
              placeholder="Describe your parcel"
              className="input input-bordered"
              {...register("parcelName", { required: true })}
            />

            {/* Parcel Weight */}
            <input
              type="number"
              step="0.1"
              min="0"
              placeholder="Weight (kg)"
              className="input input-bordered"
              disabled={parcelType === "document"}
              {...register("weight", {
                required: parcelType === "non-document",
                valueAsNumber: true,
              })}
            />
          </div>

          {parcelType === "document" && (
            <p className="text-sm text-gray-500 mt-2">
              Weight is not required for documents
            </p>
          )}
        </div>

        {/* ================= Sender & Receiver ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* -------- Sender Info -------- */}
          <div className="card bg-base-100 shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Sender Info</h3>

            <div className="space-y-4">
              <input
                placeholder="Sender Name"
                type="text"
                defaultValue={user?.name}
                className="input input-bordered w-full"
                {...register("senderName", { required: true })}
              />

              <input
                type="text"
                placeholder="Contact Number"
                className="input input-bordered w-full"
                {...register("senderContact", { required: true })}
              />

              <select
                className="select select-bordered w-full"
                {...register("senderRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("senderCenter", { required: true })}
                disabled={!senderRegion}
              >
                <option value="">Select Service Center (District)</option>
                {warehouses
                  .filter((w) => w.region === senderRegion)
                  .map((w) => (
                    <option key={w.id} value={w.centerName}>
                      {w.district}
                    </option>
                  ))}
              </select>

              <textarea
                placeholder="Pickup Address"
                className="textarea textarea-bordered w-full"
                {...register("senderAddress", { required: true })}
              />

              <textarea
                placeholder="Pickup Instruction"
                className="textarea textarea-bordered w-full"
                {...register("pickupInstruction", { required: true })}
              />
            </div>
          </div>

          {/* -------- Receiver Info -------- */}
          <div className="card bg-base-100 shadow p-6">
            <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Receiver Name"
                className="input input-bordered w-full"
                {...register("receiverName", { required: true })}
              />

              <input
                type="text"
                placeholder="Contact Number"
                className="input input-bordered w-full"
                {...register("receiverContact", { required: true })}
              />

              <select
                className="select select-bordered w-full"
                {...register("receiverRegion", { required: true })}
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <select
                className="select select-bordered w-full"
                {...register("receiverCenter", { required: true })}
                disabled={!receiverRegion}
              >
                <option value="">Select Service Center (District)</option>
                {warehouses
                  .filter((w) => w.region === receiverRegion)
                  .map((w) => (
                    <option key={w.id} value={w.centerName}>
                      {w.district}
                    </option>
                  ))}
              </select>

              <textarea
                placeholder="Delivery Address"
                className="textarea textarea-bordered w-full"
                {...register("receiverAddress", { required: true })}
              />

              <textarea
                placeholder="Delivery Instruction"
                className="textarea textarea-bordered w-full"
                {...register("deliveryInstruction", { required: true })}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary text-black w-full">
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
