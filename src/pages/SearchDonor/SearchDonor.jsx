import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';


const SearchDonors = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const { toastError } = useAuth();
    const [districts, setDistricts] = useState([]);
    const [upazilas, setUpazilas] = useState([]);
    const [searchParams, setSearchParams] = useState(null);

    useEffect(() => {
        fetch("/districts.json")
            .then(res => res.json())
            .then(data => setDistricts(data[2].data));
    }, []);

    useEffect(() => {
        fetch("/upazilas.json")
            .then(res => res.json())
            .then(data => setUpazilas(data[2].data));
    }, []);


    const { data: donors = [], refetch, isFetching } = useQuery({
        queryKey: ['search-donors', searchParams],
        queryFn: async () => {
            const params = new URLSearchParams(searchParams).toString();
            const res = await axiosPublic.get(`/search-donor?${params}`);
            if (res.data.length === 0) {
                toastError("No Donor Found!");
            }
            return res.data;
        },
        enabled: false
    });


    useEffect(() => {
        if (searchParams) {
            refetch(); 
        }
    }, [searchParams, refetch]);

    const onSubmit = (data) => {
        if (!data.bloodGroup && !data.district && !data.upazila) {
            toastError("Please select at least one filter.");
            return;
        }
        setSearchParams(data); 
    };


    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Search Donors</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 justify-center items-center md:grid-cols-4">
                
                <div>
                    <select {...register("bloodGroup")} className="select w-full">
                        <option value="">Select Your Blood Group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select>
                </div>

               
                <div>
                    <select {...register("district")} className="select w-full">
                        <option value="">Select District</option>
                        {districts.map(district => (
                            <option key={district.id} value={district.name}>{district.name}</option>
                        ))}
                    </select>
                </div>

               
                <div>
                    <select {...register("upazila")} className="select w-full">
                        <option value="">Select Upazila</option>
                        {upazilas.map(upazila => (
                            <option key={upazila.id} value={upazila.name}>{upazila.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <button type='submit' className="btn btn-neutral w-full">Search</button>
                </div>
            </form>

            {/* Donors List */}
            <div className="mt-8">
                {isFetching ? (
                    <div className='flex justify-center items-center'>
                        <span className="loading loading-bars loading-lg"></span>
                    </div>
                ) : (
                    donors.length > 0 && (
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
                    )
                )}
            </div>
        </div>
    );
};

export default SearchDonors;
