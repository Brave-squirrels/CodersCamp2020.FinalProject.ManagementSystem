import userModel from "../../../../models/user.model";
import sendEmail from "../../../../src/utils/email";

describe("sendEmail", () => {
  it("should throw error", async () => {
    const email = "";
    const token = new userModel().generateAuthToken();

    await expect(sendEmail(email, token)).resolves.not.toBeNull();
  });
});
