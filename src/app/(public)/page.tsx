import Image from "next/image";
import { Box, Typography } from "@mui/material";
import { flexWithSpace } from "@/utils/styles";
import developer from "@/public/developer.png";
import Container from "@mui/material/Container";

const LandingPage = () => {
  return (
    <Container
      sx={{
        ...flexWithSpace,
        pt: "10rem",
        flexDirection: { xs: "column-reverse", sm: "row" },
        gap: "2rem",
        height: "100",
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "70%" } }}>
        <Typography
          variant="h2"
          component="div"
          color="secondary"
          sx={{
            fontSize: { xs: "3rem", sm: "4rem" },
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          Connect with <span className="gradientText">Developers</span> Around
          the Globe
        </Typography>
      </Box>
      <Image src={developer} alt="landing page image" width={250} />
    </Container>
  );
};

export default LandingPage;
