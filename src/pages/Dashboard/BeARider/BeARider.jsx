import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";


import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const BeARider = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [serviceCenters, setServiceCenters] = useState([]);
  const [regions, setRegions] = useState([]);
  const [districts, setDistricts] = useState([]);

  const [setSelectedRegion] = useState("");

  /* ================= Load Service Centers ================= */
  useEffect(() => {
    axiosSecure.get("/serviceCenters").then((res) => {
      setServiceCenters(res.data);

      const uniqueRegions = [
        ...new Set(res.data.map((c) => c.region)),
      ];
      setRegions(uniqueRegions);
    });
  }, [axiosSecure]);

  /* ================= Handle Region Change ================= */
  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    const filteredDistricts = serviceCenters
      .filter((c) => c.region === region)
      .map((c) => c.district);

    setDistricts(filteredDistricts);
  };

  /* ================= Submit Form ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const riderApplication = {
      name: user?.displayName,
      email: user?.email,
      age: form.age.value,
      region: form.region.value,
      district: form.district.value,
      phone: form.phone.value,
      nid: form.nid.value,
      bike_registration: form.bikeRegistration.value,
      experience: form.experience.value,
      status: "pending",
      applied_at: new Date(),
    };

    try {
      await axiosSecure.post("/riders", riderApplication);

      Swal.fire({
        icon: "success",
        title: "Application Submitted",
        text: "Your rider application is under review",
      });

      form.reset();
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      Swal.fire("Error", "Failed to submit application", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Apply to Be a Rider
      </h2>

      <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-6 space-y-4">

        {/* Name */}
        <div>
          <label className="label">Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-base-200"
          />
        </div>

        {/* Age */}
        <div>
          <label className="label">Age</label>
          <input
            type="number"
            name="age"
            required
            min="18"
            placeholder="Enter your age"
            className="input input-bordered w-full"
          />
        </div>

        {/* Region */}
        <div>
          <label className="label">Region</label>
          <select
            name="region"
            required
            className="select select-bordered w-full"
            onChange={(e) => handleRegionChange(e.target.value)}
          >
            <option value="">Select Region</option>
            {regions.map((region, i) => (
              <option key={i} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label">District</label>
          <select
            name="district"
            required
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {districts.map((district, i) => (
              <option key={i} value={district}>
                {district}
              </option>
            ))}
          </select>
        </div>

        {/* Phone */}
        <div>
          <label className="label">Phone Number</label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="01XXXXXXXXX"
            className="input input-bordered w-full"
          />
        </div>

        {/* NID */}
        <div>
          <label className="label">National ID Card Number</label>
          <input
            type="text"
            name="nid"
            required
            placeholder="Enter NID number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Bike Registration */}
        <div>
          <label className="label">Bike Registration Number</label>
          <input
            type="text"
            name="bikeRegistration"
            required
            placeholder="Bike registration number"
            className="input input-bordered w-full"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="label">Delivery Experience (optional)</label>
          <textarea
            name="experience"
            placeholder="Previous delivery experience (if any)"
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Submit */}
        <button type="submit" className="btn btn-primary w-full text-black">
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
