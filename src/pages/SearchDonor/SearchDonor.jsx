import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAuth from '../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import WelcomeMessage from '../../components/WelcomeMessage/WelcomeMessage';
import DonorCard from '../../components/DonorCard/DonorCard';


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
            <WelcomeMessage heading={"Find a Blood Donor"} subheading={"Find blood donors near you and save lives with every request."}></WelcomeMessage>

            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-10 justify-center items-center md:grid-cols-4">
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
                    <button type='submit' className="btn bg-red-500 text-white w-full">Search</button>
                </div>
            </form>

            
            <div className="pb-16">
                {isFetching ? (
                    <div className='flex justify-center items-center'>
                        <span className="loading loading-bars text-red-500 loading-lg"></span>
                    </div>
                ) : (
                    donors.length > 0 && (
                        <div className="grid gird-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8  place-items-center">
                            {donors.map((donor) => <DonorCard key={donor._id} donor={donor}></DonorCard> )}
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchDonors;
