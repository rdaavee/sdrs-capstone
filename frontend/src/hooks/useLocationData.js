import { useState, useEffect } from "react";

const useLocationData = () => {
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedMunicipality, setSelectedMunicipality] = useState("");

    useEffect(() => {
        fetch("https://psgc.cloud/api/provinces")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setProvinces(data))
            .catch((error) => console.error("Error fetching provinces:", error));
    }, []);

    const handleProvinceChange = (e) => {
        const provinceCode = e.target.value;
        setSelectedProvince(provinceCode);
        setMunicipalities([]);
        setBarangays([]);

        if (!provinceCode) return;
        fetch(`https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setMunicipalities(data))
            .catch((error) => console.error("Error fetching municipalities:", error));
    };

    const handleMunicipalityChange = (e) => {
        const municipalityCode = e.target.value;
        setSelectedMunicipality(municipalityCode);
        setBarangays([]);

        if (!municipalityCode) return;

        fetch(`https://psgc.cloud/api/municipalities/${municipalityCode}/barangays`)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setBarangays(data))
            .catch((error) => console.error("Error fetching barangays:", error));
    };

    return {
        provinces,
        municipalities,
        barangays,
        handleProvinceChange,
        handleMunicipalityChange,
        selectedProvince,
        selectedMunicipality,
    };
};

export default useLocationData;
