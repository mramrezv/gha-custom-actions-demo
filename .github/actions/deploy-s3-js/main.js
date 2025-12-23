const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    const s3Uri = `s3://${bucket}`;

    await exec.exec(
      'aws',
      ['s3', 'sync', distFolder, s3Uri, '--region', bucketRegion],
      { stdio: 'inherit' }
    );

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.amazonaws.com`;

    core.setOutput('website-url', websiteUrl);

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
