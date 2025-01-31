import {
  BuildStepContext,
  BuildStepInput,
  BuildStepInputValueTypeName,
  BuildStepOutput,
} from "@expo/steps";
import { execSync } from "child_process";

interface FunctionOutputs {
  shouldSubmit: BuildStepOutput<true>; // EAS Submit するかどうかのフラグ
}

async function customBuildWorkflow(
  ctx: BuildStepContext,
  { outputs }: { outputs: FunctionOutputs }
) {
  try {
    ctx.logger.info("🔍 Running tests...");
    execSync("npm test", { stdio: "inherit" });

    ctx.logger.info("🔍 Checking TypeScript errors...");
    execSync("tsc --noEmit", { stdio: "inherit" });

    ctx.logger.info("🚀 Running EAS Build...");
    execSync(
      "eas build --platform ios --profile production --non-interactive",
      { stdio: "inherit" }
    );

    ctx.logger.info("🔍 Checking if EAS Update exists...");
    try {
      execSync("eas update:check", { stdio: "inherit" });
      ctx.logger.info("✅ EAS Update exists, skipping submit.");
      outputs.shouldSubmit.set("false"); // EAS Update がある場合は Submit しない
    } catch {
      ctx.logger.info("⚡ No EAS Update found, submitting...");
      execSync('eas update --branch production --message "New update"', {
        stdio: "inherit",
      });
      outputs.shouldSubmit.set("true");
    }

    if (outputs.shouldSubmit.value === "true") {
      ctx.logger.info("🚀 Submitting to App Store / Google Play...");
      execSync("eas submit --platform all --non-interactive", {
        stdio: "inherit",
      });
    }

    ctx.logger.info("🎉 Build & Deployment completed successfully!");
  } catch (error) {
    ctx.logger.error("❌ Build failed:", error);
    throw error;
  }
}

export default customBuildWorkflow;
