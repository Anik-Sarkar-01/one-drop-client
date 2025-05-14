import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Loading from '../../components/Loading/Loading';

const DonationRequestDetails = () => {
    const params = useParams();
    const axiosPublic = useAxiosPublic();

    const { data: donationDetails, isPending, error } = useQuery({
        queryKey: ['donationDetails', params?.id],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/request-details/${params?.id}`);
            return data;
        }
    });

    

    if (isPending) {
        return <Loading></Loading>
    }

    if (error) {
        return <p className='text-2xl font-semibold text-rose-300'>Error Occurred! Try again!</p>
    }

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2>Requester Name: {donationDetails?.requesterName}</h2>
                <h2>Requester Email: {donationDetails?.requesterEmail}</h2>
                <h2>Recipient District: {donationDetails?.recipientDistrict}</h2>
                <h2>Recipient Upazila: {donationDetails?.recipientUpazila}</h2>
                <h2>Recipient Name: {donationDetails?.recipientName}</h2>
                <h2>Hospital Name: {donationDetails?.hospitalName}</h2>
                <h2>Full Address: {donationDetails?.fullAddress}</h2>
                <h2>Donation Date: {donationDetails?.donationDate}</h2>
                <h2>Donation Time: {donationDetails?.donationTime}</h2>
                <p>Request Message: {donationDetails?.requestMessage}</p>
                <p>Blood Group: {donationDetails?.bloodGroup}</p>
                <p>Donation Status: {donationDetails?.donationStatus}</p>
                <div className="card-actions justify-start">
                    <button className="btn btn-neutral">Donate</button>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestDetails;