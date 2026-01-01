import { useForm } from "react-hook-form";

const SendParcel = ({ user }) => {
  const { register, handleSubmit, watch} = useForm();
  const parcelType = watch("type");
  const weight = watch("weight") || 0;

  const calculateCost = (data) => {
    let base = data.type === "document" ? 100 : 150;
    let weightCost = data.type === "non-document" ? weight * 20 : 0;
    let centerCost = 50; // mock service center cost
    return base + weightCost + centerCost;
  };

  const onSubmit = (data) => {
    console.log(data);
    const cost = calculateCost(data);
    console.log(cost);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-center">Send Parcel</h2>
      <p className="text-gray-500 mb-6 text-center">
        Door to Door delivery requires both pickup and delivery information
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Parcel Info</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <select
              className="select select-bordered w-full"
              {...register("type", { required: true })}
            >
              <option value="">Select Type</option>
              <option value="document">Document</option>
              <option value="non-document">Non-Document</option>
            </select>

            <input
              type="text"
              placeholder="Parcel Title"
              className="input input-bordered w-full"
              {...register("title", { required: true })}
            />

            {parcelType === "non-document" && (
              <input
                type="number"
                placeholder="Weight (kg)"
                className="input input-bordered w-full"
                {...register("weight")}
              />
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Sender Info</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              defaultValue={user?.name}
              className="input input-bordered"
              {...register("senderName", { required: true })}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="input input-bordered"
              {...register("senderContact", { required: true })}
            />
            <select
              className="select select-bordered"
              {...register("senderRegion", { required: true })}
            >
              <option value="">Select Region</option>
              <option value="dhaka">Dhaka</option>
              <option value="chattogram">Chattogram</option>
            </select>
            <select
              className="select select-bordered"
              {...register("senderCenter", { required: true })}
            >
              <option value="">Select Service Center</option>
              <option value="center-a">Center A</option>
              <option value="center-b">Center B</option>
            </select>
            <textarea
              placeholder="Pickup Address"
              className="textarea textarea-bordered md:col-span-2"
              {...register("senderAddress", { required: true })}
            />
            <textarea
              placeholder="Pickup Instruction"
              className="textarea textarea-bordered md:col-span-2"
              {...register("pickupInstruction", { required: true })}
            />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Receiver Info</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Receiver Name"
              className="input input-bordered"
              {...register("receiverName", { required: true })}
            />
            <input
              type="text"
              placeholder="Contact Number"
              className="input input-bordered"
              {...register("receiverContact", { required: true })}
            />
            <select
              className="select select-bordered"
              {...register("receiverRegion", { required: true })}
            >
              <option value="">Select Region</option>
              <option value="dhaka">Dhaka</option>
              <option value="chattogram">Chattogram</option>
            </select>
            <select
              className="select select-bordered"
              {...register("receiverCenter", { required: true })}
            >
              <option value="">Select Service Center</option>
              <option value="center-a">Center A</option>
              <option value="center-b">Center B</option>
            </select>
            <textarea
              placeholder="Delivery Address"
              className="textarea textarea-bordered md:col-span-2"
              {...register("receiverAddress", { required: true })}
            />
            <textarea
              placeholder="Delivery Instruction"
              className="textarea textarea-bordered md:col-span-2"
              {...register("deliveryInstruction", { required: true })}
            />
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
