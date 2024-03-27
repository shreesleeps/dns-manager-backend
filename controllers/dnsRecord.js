const {
  ListResourceRecordSetsCommand,
  ChangeResourceRecordSetsCommand,
} = require("@aws-sdk/client-route-53");
const { route53Client } = require("../configs/router53Client");

const getAllDNSRecords = async (req, res) => {
  try {
    const params = {
      HostedZoneId: req.body.hostedZoneId,
      //   HostedZoneId: "/hostedzone/Z03870613V0P1OS1TK8RO",
    };

    const command = new ListResourceRecordSetsCommand(params);
    const response = await route53Client.send(command);

    // Extract the DNS records from the response
    const dnsRecords = response.ResourceRecordSets;

    console.log("All DNS records:", JSON.stringify(dnsRecords));
    res.status(201).json(dnsRecords);
  } catch (error) {
    console.error("Error getting DNS records:", error);
    // throw error;
    res.status(400).send(error);
  }
};

const createDNSRecord = async (req, res) => {
  try {
    const input = {
      ChangeBatch: {
        Changes: req.body.changes,
        Comment: req.body.comment,
      },
      HostedZoneId: req.body.hostedZoneId,
    };
    // const input = {
    //   ChangeBatch: {
    //     Changes: [
    //       {
    //         Action: "CREATE",
    //         ResourceRecordSet: {
    //           Name: "ei.nexgendigimedia.com.",
    //           ResourceRecords: [
    //             {
    //               Value: "192.0.2.49",
    //             },
    //           ],
    //           TTL: 60,
    //           Type: "A",
    //         },
    //       },
    //     ],
    //     Comment: "Web server for nexgendigimedia.com",
    //   },
    //   HostedZoneId: "/hostedzone/Z03870613V0P1OS1TK8RO",
    // };
    const command = new ChangeResourceRecordSetsCommand(input);

    // Send the command to Route 53
    const response = await route53Client.send(command);
    console.log("DNS record created successfully:", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error creating DNS record:", error);
    // throw error;
    res.status(400).send(error);
  }
};

const deleteDNSRecord = async (req, res) => {
  try {
    const input = {
      ChangeBatch: {
        Changes: req.body.changes,
        Comment: req.body.comment,
      },
      HostedZoneId: req.body.hostedZoneId,
    };
    // const input = {
    //   ChangeBatch: {
    //     Changes: [
    //       {
    //         Action: "DELETE",
    //         ResourceRecordSet: {
    //           Name: "nexgendigimedia.com",
    //           ResourceRecords: [
    //             {
    //               Value: "192.0.2.44",
    //             },
    //           ],
    //           TTL: 60,
    //           Type: "A",
    //         },
    //       },
    //     ],
    //     Comment: "Delete DNS record",
    //   },
    //   HostedZoneId: "/hostedzone/Z03870613V0P1OS1TK8RO",
    // };

    const command = new ChangeResourceRecordSetsCommand(input);

    // Send the command to Route 53
    const response = await route53Client.send(command);
    console.log("DNS record deleted successfully:", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error deleting DNS record:", error);
    // throw error;
    res.status(400).send(error);
  }
};

const updateDNSRecord = async (req, res) => {
  try {
    const input = {
      ChangeBatch: {
        Changes: req.body.changes,
        Comment: req.body.comment,
      },
      HostedZoneId: req.body.hostedZoneId,
    };
    // const input = {
    //   ChangeBatch: {
    //     Changes: [
    //       {
    //         Action: "UPSERT", // Use UPSERT to update or insert the record
    //         ResourceRecordSet: {
    //           Name: "nexgendigimedia.com", // Name of the DNS record to update
    //           Type: "A", // Type of DNS record
    //           TTL: 60, // New TTL value
    //           ResourceRecords: [
    //             {
    //               Value: "192.0.2.41", // New IP address or record value
    //             },
    //           ],
    //         },
    //       },
    //     ],
    //     Comment: "Update DNS record", // Optional comment
    //   },
    //   HostedZoneId: "/hostedzone/Z03870613V0P1OS1TK8RO", // Hosted zone ID
    // };

    const command = new ChangeResourceRecordSetsCommand(input);

    const response = await route53Client.send(command);
    console.log("DNS record updated successfully:", response);
    res.status(201).json(response);
  } catch (error) {
    console.error("Error updating DNS record:", error);
    // throw error;
    res.status(400).send(error);
  }
};

module.exports = {
  getAllDNSRecords,
  createDNSRecord,
  deleteDNSRecord,
  updateDNSRecord,
};
