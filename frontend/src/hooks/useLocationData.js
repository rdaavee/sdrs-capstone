import { useState, useEffect } from "react";

const useLocationData = (setFormData) => {
    const [provinces, setProvinces] = useState([]);
    const [municipalities, setMunicipalities] = useState([]);
    const [barangays, setBarangays] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [selectedMunicipality, setSelectedMunicipality] = useState("");

    useEffect(() => {
        fetch("https://psgc.cloud/api/provinces")
            .then((res) => {
                if (!res.ok)
                    throw new Error(`HTTP error! Status: ${res.status}`);
                return res.json();
            })
            .then((data) => setProvinces(data))
            .catch((error) =>
                console.error("Error fetching provinces:", error)
            );
    }, []);

    const handleProvinceChange = (e) => {
        const provinceName = e.target.selectedOptions[0].text;
        const provinceCode = e.target.value;

        setFormData((prev) => ({
            ...prev,
            province: provinceName,
            municipality: "",
            barangay: "",
        }));

        setSelectedProvince(provinceCode);
        setMunicipalities([]);
        setBarangays([]);

        if (!provinceCode) return;

        fetch(
            `https://psgc.cloud/api/provinces/${provinceCode}/cities-municipalities`
        )
            .then((res) => res.json())
            .then((data) => setMunicipalities(data))
            .catch((error) =>
                console.error("Error fetching municipalities:", error)
            );
    };

    const handleMunicipalityChange = (e) => {
        const municipalityName = e.target.selectedOptions[0].text;
        const municipalityCode = e.target.value;

        setFormData((prev) => ({
            ...prev,
            municipality: municipalityName,
            barangay: "",
        }));

        setSelectedMunicipality(municipalityCode);
        setBarangays([]);

        if (!municipalityCode) return;

        fetch(
            `https://psgc.cloud/api/municipalities/${municipalityCode}/barangays`
        )
            .then((res) => res.json())
            .then((data) => setBarangays(data))
            .catch((error) =>
                console.error("Error fetching barangays:", error)
            );
    };

    const handleBarangayChange = (e) => {
        const barangayName = e.target.selectedOptions[0].text;

        setFormData((prev) => ({
            ...prev,
            barangay: barangayName,
        }));
    };

    return {
        provinces,
        municipalities,
        barangays,
        handleProvinceChange,
        handleMunicipalityChange,
        handleBarangayChange,
        selectedProvince,
        selectedMunicipality,
    };
};

export default useLocationData;
