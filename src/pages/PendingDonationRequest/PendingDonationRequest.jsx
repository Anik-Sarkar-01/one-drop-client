import React from 'react';
import usePendingDonationRequests from '../../hooks/usePendingDonationRequests';
import Loading from '../../components/Loading/Loading';
import RequestCard from '../../components/RequestCard/RequestCard';


const PendingDonationRequest = () => {
    const { pendingDonationRequests, isLoading } = usePendingDonationRequests();

    return (
        <div>
            {
                isLoading ?
                    <>
                        <Loading></Loading>
                    </>
                    :


                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 py-14 place-items-center'>
                        {
                            pendingDonationRequests.map(request => <RequestCard key={request._id} request={request}></RequestCard>)
                        }
                    </div>

            }

        </div>
    );
};

export default PendingDonationRequest;