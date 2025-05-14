import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';


const SearchDonors = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const [donors, setDonors] = useState([]);

    const onSubmit = async (data) => {
        try {
            const params = new URLSearchParams(data).toString();
            const response = await axiosPublic.get(`/search-donor?${params}`);
            console.log(response.data);
            setDonors(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Search Donors</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-4">
                {/* Blood Group Selector */}
                <div>
                    <label className="block mb-1">Blood Group</label>
                    <select {...register("bloodGroup")} className="select select-bordered w-full">
                        <option value="">Select Blood Group</option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </div>

                {/* District Selector */}
                <div>
                    <label className="block mb-1">District</label>
                    <select {...register("district")} className="select select-bordered w-full">
                        <option value="">Select District</option>
                        {/* Example districts */}
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattogram">Chattogram</option>
                    </select>
                </div>

                {/* Upazila Selector */}
                <div>
                    <label className="block mb-1">Upazila</label>
                    <select {...register("upazila")} className="select select-bordered w-full">
                        <option value="">Select Upazila</option>
                        {/* Example upazilas */}
                        <option value="Uttara">Uttara</option>
                        <option value="Mirpur">Mirpur</option>
                    </select>
                </div>

                {/* Search Button */}
                <div className="flex items-end">
                    <button type="submit" className="btn btn-primary w-full">Search</button>
                </div>
            </form>

            {/* Donors List */}
            <div className="mt-8">
                {donors.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-3">
                        {donors.map((donor) => (
                            <div key={donor._id} className="card bg-base-100 shadow-md p-4">
                                <h3 className="text-xl font-semibold">{donor.name}</h3>
                                <p>Blood Group: {donor.bloodGroup}</p>
                                <p>District: {donor.district}</p>
                                <p>Upazila: {donor.upazila}</p>
                                <p>Email: {donor.email}</p>
                                <button className="btn btn-outline btn-sm mt-2">Contact</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 mt-4">No donors found.</p>
                )}
            </div>
        </div>
    );
};

export default SearchDonors;
