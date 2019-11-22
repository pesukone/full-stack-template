variable "taito_provider_region" {
  type = string
}

variable "taito_organization" {
}

variable "taito_provider_user_profile" {
  type    = string
  default = ""
}

variable "taito_project" {
  type = string
}

variable "taito_env" {
  type = string
}

variable "taito_domain" {
  type = string
}

/* Monitoring */
variable "taito_uptime_targets" {
  type = string  # whitespace delimited strings
  default = ""
}

variable "taito_uptime_paths" {
  type = string  # whitespace delimited strings
  default = ""
}

/* TODO: use timeout */
variable "taito_uptime_timeouts" {
  type = string  # whitespace delimited strings
  default = ""
}

variable "taito_uptime_channels" {
  type = string  # whitespace delimited strings
  default = ""
}
