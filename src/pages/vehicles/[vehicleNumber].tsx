import { useRouter } from "next/router";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const VehiclePage: NextPage = () => {
  const router = useRouter();
  const { vehicleNumber } = router.query;
  const [isLoading, setIsLoading] = useState(false);

  const handleVehicleRedirect = () => {
    if (!vehicleNumber) return;

    setIsLoading(true);

    const redirectUrl = `https://api.scootapi.com/application/rooh/link`;
    window.location.href = redirectUrl;

    setIsLoading(false);
  };

  useEffect(() => {
    if (vehicleNumber) {
      handleVehicleRedirect();
    }
  }, [vehicleNumber]);

  return (
    <div className="p-4">
      <p>Redirecting...</p>
    </div>
  );
};

export default VehiclePage;
