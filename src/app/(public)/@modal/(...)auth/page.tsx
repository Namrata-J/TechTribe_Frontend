import { Modal } from "@mui/material";
import { flexWithCenter } from "@/utils/styles";
import { AuthModalComp } from "@/components/auth/AuthModal";

const AuthModal = () => {
  return (
    <Modal sx={flexWithCenter} open={true} aria-labelledby="auth">
      <AuthModalComp />
    </Modal>
  );
};

export default AuthModal;
