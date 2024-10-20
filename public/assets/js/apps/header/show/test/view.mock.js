define(["mock"], function (mockjax) {
  var mocks = [];

  return {
    enable: function () {
      mocks.push(
        mockjax({
          url: "//localhost:8080/otcs/cs/api/v1/members",
          responseText: {
            results: [
              {
                birth_date: null,
                business_email: "sminil@msn.com",
                business_fax: null,
                business_phone: 12345678,
                cell_phone: null,
                deleted: 0,
                first_name: null,
                gender: null,
                group_id: null,
                home_address_1: null,
                home_address_2: null,
                home_fax: null,
                home_phone: null,
                id: 999,
                last_name: null,
                middle_name: null,
                name: "[Content Server Administration]",
                office_location: null,
                pager: null,
                personal_email: null,
                personal_interests: null,
                personal_url_1: null,
                personal_url_2: null,
                personal_url_3: null,
                personal_website: null,
                photo_id: null,
                photo_url: null,
                privilege_grant_discovery: false,
                privilege_login: false,
                privilege_modify_groups: false,
                privilege_modify_users: false,
                privilege_public_access: false,
                privilege_system_admin_rights: false,
                privilege_user_admin_rights: false,
                time_zone: null,
                title: null,
                type: 1,
                type_name: "Group",
                name_formatted: "[Content Server Administration]",
                initials: "[",
                leader_id: null
              }
            ]
          }
        })
      );
    },

    disable: function () {
      var mock;
      while ((mock = mocks.pop())) {
        mockjax.clear(mock);
      }
    }
  };
});
