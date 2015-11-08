
var CoreException = {

    "PARAMETER_INVALID": ["900", "param_error"],
    "RESOURCE_NO_FOUND": ["404", "resource_not_found"],
    "CONTENT_INCLUDE_SENSITIVE_WORDS": ["901", "content_include_sensitive_words"],
    "IMAGE_BIG_THAN_5M": ["902", "image_big_than_5m"],
    "OPERATING_FREQUENCY_FAST": ["904", "operating_frequency_fast"],

    // user 相关以 10 开头
    "USER_NOT_LOGIN": ["1000", "user_not_login"],
    "USER_NOT_EXISTS": ["1001", "user_not_exists"],
    "USER_REGISTER_FAILED": ["1002", "user_register_failed"],
    "USER_RESET_PASSWORD_FAILED": ["1003", "user_reset_password_failed"],
    "USER_PASSWORD_INCONSISTENT": ["1004", "user_password_inconsistent"],
    "USER_OLD_PASSWORD_ERROR": ["1005", "user_old_password_error"],
    "USER_EMAIL_NOT_EXISTS": ["1006", "user_email_not_exists"],
    "USER_ALREADY_EXISTS": ["1007", "user_already_exists"],
    "USER_PASSWORD_ERROR": ["1008", "user_password_error"],
    "USER_EMAIL_ERROR": ["1009", "user_email_error"],
    "USER_EMAIL_NOT_EMPTY": ["1010", "user_email_not_empty"],

    // project 相关以 11 开头
    "PROJECT_NOT_EXIST": ["1100", "project_not_exists"],
    "PROJECT_MEMBER_EXISTS": ["1101", "project_member_exists"],
    "PROJECT_MEMBER_NOT_EXISTS": ["1102", "project_member_not_exists"],
    "PROJECT_NAME_EXISTS": ["1103", "project_name_exists"],
    "PROJECT_TOPIC_TITLE_NOT_EMPTY": ["1104", "project_topic_title_not_empty"],
    "PROJECT_TOPIC_CONTENT_NOT_EMPTY": ["1105", "project_topic_content_not_empty"],
    "PROJECT_ALREADY_STARS": ["1106", "project_already_stars"],
    "PROJECT_ALREADY_WATCH": ["1107", "project_already_watch"],
    "PROJECT_TOPIC_COMMENT_CONTENT_NOT_EMPTY": ["1108", "project_topic_comment_content_not_empty"],
    "PROJECT_OWNER_CANNOT_QUIT": ["1109", "project_owner_can_not_quit"],
    "PROJECT_MEMBER_OVER": ["1110", "project_member_over"],
    "PROJECT_FILE_SPACE_OVER": ["1111", "project_file_space_over"],
    "QUIT_PROJECT_FAIL_HAVA_PROGRESS_TASK": ["1112", "quit_project_fail_hava_progress_task"],
    "DELETE_MEMBER_FAIL_HAVA_PROGRESS_TASK": ["1113", "delete_member_fail_hava_progress_task"],
    "PROJECT_TOPIC_TITLE_TOO_LONG": ["1114", "project_topic_title_too_long"],
    "TASK_STATUS_PARAM_ERROR": ["1115", "task_status_param_error"],
    "PROJECT_DESCRIPTION_TOO_LONG": ["1116", "project_description_too_long"],

    // depot 相关的以 12 开头
    "DEPOT_NOT_EXIST": ["1200", "depot_not_exists"],
    "DIFF_TOO_LARGE": ["1201", "diff_too_large"],
    "DEPOT_FORKED": ["1202", "depot_forked"],
    "PULL_REQUEST_NOT_FOUND": ["1203", "pull_request_not_found"],
    "DEPOT_HAS_NO_COMMIT": ["1204", "depot_has_no_commit"],
    "CAN_NOT_PULL_REQUEST": ["1205", "can_not_pull_request"],
    "PULL_REQUEST_EXIST": ["1206", "pull_request_exists"],
    "PUBLIC_KEY_EXIST": ["1207", "public_key_exists"],
    "PUBLIC_KEY_FORMAT_ERROR": ["1217", "public_key_format_error"],
    "CAN_NOT_FORK_PRIVATE": ["1208", "cant_not_fork_private"],
    "PATH_NOT_FOUND": ["1209", "path_not_found"],
    "COMPARE_COMMIT_1_NOT_EXIST": ["1210", "compare_commit_1_not_exist"],
    "COMPARE_COMMIT_2_NOT_EXIST": ["1211", "compare_commit_2_not_exist"],
    "COMMMIT_NOT_EXISTS": ["1212", "commit_not_exists"],
    "TARGET_DEPOT_NOT_EXISTS": ["1213", "target_depot_not_exists"],
    "BRANCH_NOT_EXISTS": ["1214", "branch_not_exists"],
    "FILE_NOT_EXISTS": ["1215", "file_not_exists"],
    "FILE_EXISTS": ["1217", "file_exists"],
    "IS_NOT_IN_HEAD": ["1216", "is_not_in_head"],
    "FILE_NAME_ERROR": ["1218", "file_name_error"],
    "BRANCH_NAME_ERROR": ["1219", "branch_name_error"],
    "TAG_NAME_ERROR": ["1220", "tag_name_error"],
    "PROTECTED_BRANCH_EXIST": ["1221", "protected_branch_exist"],
    "BRANCH_OR_TAG_EXIST": ["1222", "branch_or_tag_exist"],
    "DEPOT_NOT_EMPTY": ["1223", "depot_not_empty"],
    "DEPOT_IS_IMPORTING": ["1224", "depot_is_importing"],
    "MERGE_REQUEST_EXIST": ["1225", "merge_request_exits"],
    "CAN_NOT_MERGE_REQUEST": ["1226", "can_not_merge_request"],
    "MERGE_REQUEST_NOT_FOUND": ["1227", "merge_request_not_found"],
    "FILE_NOT_TEXT": ["1228", "file_not_text"],

    //permissions相关以 14 开头
    "PERMISSION_DENIED": ["1400", "permission_denied"],
    "PASSWORD_ERROR": ["1401", "password_error"],

    of: function (e) {
        return {
            code: e[0],
            msg: e[1]
        }
    }
};

module.exports = CoreException;