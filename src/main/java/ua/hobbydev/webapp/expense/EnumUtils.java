/**
 * This software is licensed under the terms of the MIT license.
 * Copyright (C) 2016 Dmytro Romenskyi
 */
package ua.hobbydev.webapp.expense;

/**
 * Created by dmytro.romenskyi on 10/28/2016.
 */
public class EnumUtils {

    public static class AuthorityEnums {
        public enum VIEW {
            VIEW_MENU_ADMIN
        }
    }

    public static class AssetEnums {
        public enum AssetType {
            CASH("Cash");

            private final String label;
            private AssetType(String label) {this.label = label;}
            public String getLabel(){return label;}
        }
    }
}
