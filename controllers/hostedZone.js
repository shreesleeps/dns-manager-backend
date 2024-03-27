const {
  ListHostedZonesCommand,
  DeleteHostedZoneCommand,
  CreateHostedZoneCommand,
} = require("@aws-sdk/client-route-53");
const { route53Client } = require("../configs/router53Client");

const getAllHostedZones = async (req, res) => {
  try {
    const command = new ListHostedZonesCommand({});
    const response = await route53Client.send(command);
    console.log("Hosted zone reieved successfully:", response.HostedZones);
    res.status(201).json(response.HostedZones);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
};

const createHostedZone = async (req, res) => {
  try {
    const params = {
      Name: req.body.domainName, // Domain name for the hosted zone
      CallerReference: req.body.callerReference, // Unique identifier for the request
      HostedZoneConfig: {
        Comment: req.body.comment, // Optional comment for the hosted zone
      },
    };

    const command = new CreateHostedZoneCommand(params);
    const response = await route53Client.send(command);
    console.log("Hosted zone created successfully:", response.HostedZone);
    res.status(201).json(response.HostedZone);
  } catch (error) {
    console.error("Error:", error);
    // throw error; // Throw error to handle it in the caller function
    res.status(400).send(error);
  }
};

const deleteHostedZone = async (req, res) => {
  try {
    const params = {
      Id: req.body.hostedZoneId, // ID of the hosted zone to delete
    };

    const command = new DeleteHostedZoneCommand(params);
    const response = await route53Client.send(command);
    console.log("Hosted zone deleted successfully", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error:", error);
    res.status(400).send(error);
  }
};

module.exports = { getAllHostedZones, createHostedZone, deleteHostedZone };
