import { useEffect, useState } from "react";
import { Box, Button, MobileStepper } from "@mui/material";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80";

const ProductImageCarousel = ({ images = [], productName = "Product" }) => {
  const [activeStep, setActiveStep] = useState(0);

  const slides = images.length
    ? images.map((image) => image.url)
    : [FALLBACK_IMAGE];

  useEffect(() => {
    setActiveStep(0);
  }, [images]);

  const maxSteps = slides.length;

  const handleNext = () => {
    setActiveStep((prev) => (prev + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep((prev) => (prev - 1 + maxSteps) % maxSteps);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          height: { xs: 320, md: 420 },
          width: "100%",
          overflow: "hidden",
          borderRadius: 2,
        }}
      >
        <img
          src={slides[activeStep]}
          alt={`${productName} ${activeStep + 1}`}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </Box>

      {maxSteps > 1 && (
        <MobileStepper
          variant="dots"
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            mt: 2,
            bgcolor: "transparent",
            "& .MuiMobileStepper-dot": { bgcolor: "rgba(255,255,255,0.3)" },
            "& .MuiMobileStepper-dotActive": { bgcolor: "#3d6b54" },
          }}
          nextButton={
            <Button size="small" onClick={handleNext} sx={{ color: "#e8f0ec" }}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack} sx={{ color: "#e8f0ec" }}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      )}
    </Box>
  );
};

export default ProductImageCarousel;
