provider "google" {
  project = "${var.taito_resource_namespace_id}"
  region = "${var.gcloud_region}"
  zone = "${var.gcloud_zone}"
}

module "common-gcloud" {
  source = "../common/gcloud"

  taito_project = "${var.taito_project}"
  taito_env = "${var.taito_env}"
  taito_domain = "${var.taito_domain}"
  taito_zone = "${var.taito_zone}"
  taito_namespace = "${var.taito_namespace}"
  taito_resource_namespace = "${var.taito_resource_namespace}"
  taito_resource_namespace_id = "${var.taito_resource_namespace_id}"
  taito_provider = "${var.taito_provider}"
  taito_organization = "${var.taito_organization}"
  taito_organization_abbr = "${var.taito_organization_abbr}"

  taito_storages = "${var.taito_storages}"
  taito_storage_locations = "${var.taito_storage_locations}"
  taito_storage_classes = "${var.taito_storage_classes}"
  taito_storage_days = "${var.taito_storage_days}"

  taito_backup_locations = "${var.taito_backup_locations}"
  taito_backup_classes = "${var.taito_backup_classes}"
  taito_backup_days = "${var.taito_backup_days}"

  taito_monitoring_targets = "${var.taito_monitoring_targets}"
  taito_monitoring_paths = "${var.taito_monitoring_paths}"
  taito_monitoring_timeouts = "${var.taito_monitoring_timeouts}"
  taito_monitoring_uptime_channels = "${var.taito_monitoring_uptime_channels}"

  gcloud_org_id = "${var.gcloud_org_id}"
  gcloud_service_account_enabled = "${var.gcloud_service_account_enabled}"
  gcloud_region = "${var.gcloud_region}"
  gcloud_zone = "${var.gcloud_zone}"
}
